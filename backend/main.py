from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging

from ai_engine import analyze_pdf_with_ai, analyze_text_with_ai
from schemas import ExtractionResult

logging.basicConfig(level=logging.INFO)

app = FastAPI()

# ================== CORS (FINAL & CORRECT) ==================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://deadline-companion-tau.vercel.app",
        "https://deadline-companion-git-main-ibrahim-hassans-projects.vercel.app",
    ],
    allow_credentials=True,
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

# ================== HEALTH CHECK ==================
@app.get("/")
def root():
    return {"status": "ok"}
