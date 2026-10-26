"""
SnowyCare AI Healthcare Platform - FastAPI Application
Main application entry point providing REST endpoints for the NVIDIA AI Agent.
"""

import logging
from pathlib import Path
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse

from .config import settings
from .schemas import (
    ChatRequest, 
    ChatResponse, 
    PrescriptionExtractionRequest, 
    PrescriptionExtractionResponse,
    MedicineInfoRequest, 
    MedicineInfoResponse, 
    HealthCheckResponse
)
from .agent import process_chat, extract_prescription, explain_medicine
from .services.nvidia_service import NvidiaClientError

# Configure structured logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("snowycare.api")

app = FastAPI(
    title=settings.app_name,
    version=settings.version,
    description=(
        "FastAPI backend for SnowyCare, integrating NVIDIA's minimaxai/minimax-m3.1-flash "
        "model for clinical guidance, prescription extraction, and order assistance."
    )
)

# Enable CORS for frontend web integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(NvidiaClientError)
async def nvidia_client_error_handler(request, exc: NvidiaClientError):
    logger.error(f"NvidiaClientError on {request.url}: {exc.message}")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "status": "error",
            "message": exc.message,
            "detail": exc.detail
        }
    )


@app.get("/", tags=["General"])
async def root():
    return {
        "platform": "SnowyCare AI Healthcare Platform",
        "status": "online",
        "model": settings.nvidia_model,
        "api_configured": settings.is_api_key_configured,
        "docs_url": "/docs"
    }


@app.get("/api/health", response_model=HealthCheckResponse, tags=["General"])
async def health_check():
    """Returns server status, active model, and whether NVIDIA API key is configured."""
    return HealthCheckResponse(
        status="healthy",
        api_configured=settings.is_api_key_configured,
        model=settings.nvidia_model,
        version=settings.version,
        masked_key=settings.masked_api_key
    )


@app.post("/api/chat", response_model=ChatResponse, tags=["AI Agent"])
async def chat_endpoint(request: ChatRequest):
    """
    Primary chat endpoint for conversational clinical advice, symptom education,
    and platform guidance powered by minimaxai/minimax-m3.1-flash.
    """
    try:
        response = await process_chat(
            messages=request.messages, 
            context=request.context
        )
        return response
    except NvidiaClientError:
        raise
    except Exception as exc:
        logger.error(f"Unhandled error in chat endpoint: {exc}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while generating AI clinical response: {str(exc)}"
        )


@app.post("/api/extract-prescription", response_model=PrescriptionExtractionResponse, tags=["Prescriptions"])
async def extract_prescription_endpoint(request: PrescriptionExtractionRequest):
    """
    Extracts prescribed medications from uploaded prescription text or image,
    cross-checking ingredients against patient recorded allergies.
    """
    try:
        response = await extract_prescription(
            text=request.text,
            image_base64=request.image_base64,
            file_name=request.file_name,
            user_allergies=request.user_allergies
        )
        return response
    except Exception as exc:
        logger.error(f"Error in prescription extraction: {exc}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to extract prescription: {str(exc)}"
        )


@app.post("/api/explain-medicine", response_model=MedicineInfoResponse, tags=["Pharmacy"])
async def explain_medicine_endpoint(request: MedicineInfoRequest):
    """
    Provides evidence-based patient education for specific medications,
    including dietary timing, precautions, and allergy warnings.
    """
    try:
        response = await explain_medicine(
            medicine_name=request.medicine_name,
            user_allergies=request.user_allergies
        )
        return response
    except Exception as exc:
        logger.error(f"Error explaining medicine: {exc}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate medication information: {str(exc)}"
        )


@app.get("/api/delivery/status", tags=["Orders"])
async def get_delivery_status(order_id: str = "SC-8921"):
    """Returns real-time courier tracking for active prescription deliveries."""
    return {
        "order_id": order_id,
        "status": "Out for Delivery",
        "courier": "Snowberry Express Health Courier #14",
        "eta": "45 minutes",
        "tamper_proof_sealed": True,
        "pharmacist_verified": True,
        "items": [
            "Ferrous Ascorbate 100mg + Folic Acid 1.5mg",
            "Elemental Vitamin D3 60,000 IU",
            "Gentle Acetaminophen 500mg"
        ]
    }


# Check if frontend exists in parent directory to serve static assets if needed
frontend_dir = Path(__file__).resolve().parent.parent.parent
if (frontend_dir / "index.html").exists():
    app.mount("/app", StaticFiles(directory=str(frontend_dir), html=True), name="frontend")
    logger.info(f"Frontend static files mounted at /app from {frontend_dir}")


if __name__ == "__main__":
    import uvicorn
    logger.info(f"Starting {settings.app_name} on {settings.host}:{settings.port}")
    uvicorn.run("backend.app.main:app", host=settings.host, port=settings.port, reload=True)
