"""
SnowyCare AI Healthcare Platform - Pydantic Schemas
Defines request and response models for the NVIDIA AI agent endpoints.
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    role: str = Field(..., description="Role of the author: system, user, or assistant")
    content: str = Field(..., description="Message text content")


class ChatRequest(BaseModel):
    messages: List[ChatMessage] = Field(..., description="Full conversation history")
    context: Optional[Dict[str, Any]] = Field(
        default=None, 
        description="Optional health context (e.g. cycleDay, activeMeds, recordedAllergies)"
    )


class ChatResponse(BaseModel):
    response: str
    role: str = "assistant"
    model: str
    status: str = "success"
    using_mock: bool = False


class PrescriptionExtractionRequest(BaseModel):
    image_base64: Optional[str] = Field(None, description="Base64 encoded prescription image data URL")
    text: Optional[str] = Field(None, description="Pasted prescription or clinical text")
    file_name: Optional[str] = Field(None, description="Uploaded file name")
    user_allergies: Optional[List[str]] = Field(default=[], description="User allergies for automated cross-checking")


class ExtractedMedicine(BaseModel):
    name: str
    dosage: str
    frequency: str
    instructions: str
    in_stock: bool = True
    estimated_price: float = 14.50


class PrescriptionExtractionResponse(BaseModel):
    medicines: List[ExtractedMedicine]
    doctor_name: Optional[str] = None
    patient_name: Optional[str] = None
    date: Optional[str] = None
    clinical_notes: Optional[str] = None
    allergy_warnings: List[str] = []
    verification_required: bool = True
    summary: str
    disclaimer: str = (
        "Prescription extraction is provided for preliminary guidance only. "
        "All medications must be verified and authorized by a licensed pharmacist or physician before dispensing."
    )


class MedicineInfoRequest(BaseModel):
    medicine_name: str = Field(..., description="Name of the medicine or vitamin to explain")
    user_allergies: Optional[List[str]] = Field(default=[], description="User's known drug allergies")


class MedicineInfoResponse(BaseModel):
    name: str
    description: str
    common_uses: List[str]
    side_effects: List[str]
    precautions: List[str]
    allergy_warnings: List[str]
    dietary_notes: str
    prescription_required: bool = True


class HealthCheckResponse(BaseModel):
    status: str
    api_configured: bool
    model: str
    version: str
    masked_key: str
