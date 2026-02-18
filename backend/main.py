from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging

from ai_engine import analyze_pdf_with_ai, analyze_text_with_ai
from schemas import ExtractionResult

logging.basicConfig(level=logging.INFO)

app = FastAPI()

# ================== CORS (PRODUCTION SAFE) ==================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ✅ REQUIRED for Vercel + Railway
    allow_credentials=False,  # MUST be False when allow_origins=["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================== MODELS ==================
class TextInput(BaseModel):
    content: str

# ================== ROUTES ==================
@app.post("/analyze-text", response_model=ExtractionResult)
async def analyze_text(input: TextInput):
    logging.info("Analyzing text input")
    return analyze_text_with_ai(input.content)

@app.post("/analyze-document", response_model=ExtractionResult)
async def analyze_document(file: UploadFile = File(...)):
    logging.info(f"Analyzing PDF: {file.filename}")
    file_bytes = await file.read()
    return analyze_pdf_with_ai(file_bytes, file.filename)

# ================== LOCAL DEV ==================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
