from fastapi import FastAPI, UploadFile, File, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging

from ai_engine import analyze_pdf_with_ai, analyze_text_with_ai
from schemas import ExtractionResult

logging.basicConfig(level=logging.INFO)

app = FastAPI()

# ================== CORS (FIXED PROPERLY) ==================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================== MODELS ==================
class TextInput(BaseModel):
    content: str


# ================== OPTIONS (PRE-FLIGHT) ==================
@app.options("/analyze-text")
async def options_analyze_text():
    return Response(status_code=200)


@app.options("/analyze-document")
async def options_analyze_document():
    return Response(status_code=200)


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
