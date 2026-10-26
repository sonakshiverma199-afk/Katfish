"""
SnowyCare AI Healthcare Platform - NVIDIA API Client Service
Handles authenticated HTTP requests to NVIDIA's minimaxai/minimax-m3.1-flash model.
"""

import logging
from typing import List, Dict, Any, Optional
import httpx
from ..config import settings

logger = logging.getLogger("snowycare.nvidia")


class NvidiaClientError(Exception):
    """Custom exception for NVIDIA API interaction errors."""
    def __init__(self, message: str, status_code: int = 500, detail: Optional[str] = None):
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.detail = detail


async def call_nvidia_chat_completion(
    messages: List[Dict[str, str]],
    temperature: float = 0.3,
    max_tokens: int = 1500
) -> Dict[str, Any]:
    """
    Sends chat completion request to NVIDIA API endpoint for minimaxai/minimax-m3.1-flash.
    Returns parsed response dictionary with generated content.
    """
    if not settings.is_api_key_configured:
        logger.warning(
            "NVIDIA_API_KEY is not configured or contains placeholder. "
            "Falling back to intelligent local clinical simulation."
        )
        return {
            "content": get_simulated_clinical_response(messages),
            "model": settings.nvidia_model,
            "using_mock": True
        }

    headers = {
        "Authorization": f"Bearer {settings.nvidia_api_key}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    payload = {
        "model": settings.nvidia_model,
        "messages": messages,
        "temperature": temperature,
        "top_p": 0.95,
        "max_tokens": max_tokens,
        "stream": False
    }

    try:
        async with httpx.AsyncClient(timeout=45.0) as client:
            response = await client.post(
                settings.nvidia_endpoint,
                headers=headers,
                json=payload
            )

            # Check HTTP status
            if response.status_code == 401:
                raise NvidiaClientError(
                    "Invalid or expired NVIDIA API Key. Please verify your NVIDIA_API_KEY in backend/.env.",
                    status_code=401,
                    detail=response.text
                )
            elif response.status_code == 429:
                raise NvidiaClientError(
                    "NVIDIA API rate limit reached. Please retry in a few moments.",
                    status_code=429,
                    detail=response.text
                )
            elif response.status_code >= 400:
                raise NvidiaClientError(
                    f"NVIDIA API responded with status {response.status_code}: {response.text}",
                    status_code=response.status_code,
                    detail=response.text
                )

            data = response.json()
            
            # Parse OpenAI-compatible response shape
            choices = data.get("choices", [])
            if not choices:
                raise NvidiaClientError("NVIDIA API returned an empty choices list.", status_code=502)

            message = choices[0].get("message", {})
            content = message.get("content", "").strip()

            return {
                "content": content,
                "model": data.get("model", settings.nvidia_model),
                "using_mock": False,
                "usage": data.get("usage", {})
            }

    except httpx.TimeoutException as exc:
        logger.error(f"NVIDIA API connection timed out: {exc}")
        raise NvidiaClientError("Request to NVIDIA API timed out. Please try again.", status_code=504)
    except httpx.RequestError as exc:
        logger.error(f"Network error connecting to NVIDIA API: {exc}")
        raise NvidiaClientError(f"Network error connecting to NVIDIA API: {str(exc)}", status_code=503)
    except NvidiaClientError:
        raise
    except Exception as exc:
        logger.error(f"Unexpected error calling NVIDIA API: {exc}", exc_info=True)
        raise NvidiaClientError(f"Unexpected error processing AI response: {str(exc)}", status_code=500)


def get_simulated_clinical_response(messages: List[Dict[str, str]]) -> str:
    """
    Intelligent clinical fallback when NVIDIA_API_KEY is not yet supplied.
    Ensures seamless prototype testing while guiding the developer to add their key.
    """
    last_user_message = ""
    for msg in reversed(messages):
        if msg.get("role") == "user":
            last_user_message = msg.get("content", "").lower()
            break

    if "ferritin" in last_user_message or "iron" in last_user_message or "anemia" in last_user_message:
        return (
            "Hello, sweet pookie! 🌸\n\n"
            "Ferritin reflects your body's stored iron reserves. In menstruating women, ferritin levels "
            "frequently dip before hemoglobin decreases because monthly flows deplete reserves faster than diet replaces them.\n\n"
            "**Key Clinical Takeaways:**\n"
            "• **Absorption Tip:** Oral iron is best absorbed on an empty stomach paired with Vitamin C (e.g., orange juice or bell peppers).\n"
            "• **Avoid Tannins:** Calcium, coffee, and black tea inhibit iron absorption by up to 60% if consumed within 1 hour.\n"
            "• **Next Steps:** Ask your physician if an oral elemental supplement (such as Ferrous Ascorbate 100mg) is appropriate for your profile.\n\n"
            "*(Notice: Live NVIDIA MiniMax M3.1 Flash integration is ready. Add your NVIDIA_API_KEY in backend/.env to connect to live model servers.)*"
        )
    elif "cramp" in last_user_message or "period" in last_user_message or "pain" in last_user_message:
        return (
            "I hear you, pookie! Menstrual cramps (dysmenorrhea) are caused by prostaglandins triggering uterine contractions.\n\n"
            "**Clinically Proven Comfort Measures:**\n"
            "1. **Continuous Heat:** Applying a heating pad (approx 40°C) is clinically shown to relax myometrial spasm as effectively as oral analgesics.\n"
            "2. **Magnesium Glycinate:** 300–400mg daily supports smooth muscle relaxation and calms neuromuscular tension.\n"
            "3. **Hydration & Herbal Warmth:** Peppermint and chamomile teas ease pelvic blood flow.\n\n"
            "Remember: If cramps are debilitating or resistant to standard care, please book a quick consultation with Dr. Frost!"
        )
    elif "delivery" in last_user_message or "track" in last_user_message or "order" in last_user_message:
        return (
            "Your prescription order **#SC-8921** is currently **Out for Delivery** via Snowberry Express Courier #14! 🛵📦\n\n"
            "• **Estimated Delivery Time:** Within 45 minutes.\n"
            "• **Contents:** Ferrous Ascorbate 100mg, Elemental Vitamin D3, Gentle Acetaminophen.\n"
            "• **Packaging:** Sealed in tamper-proof thermal packaging with pharmacist verification seal."
        )
    else:
        return (
            "Hello, sweet pookie! 🐻‍❄️🩺 I am Snowy, your personal AI healthcare and medicine companion.\n\n"
            "I can help you understand your lab reports, explain prescribed medications, check for drug allergy conflicts, "
            "and track your cycle wellness.\n\n"
            "What would you like to explore together today?\n\n"
            "*(NVIDIA MiniMax M3.1 Flash Agent Backend Active. Configure NVIDIA_API_KEY in backend/.env to enable live NVIDIA cloud completions.)*"
        )
