import json
from openai import OpenAI
from schemas import ExtractionResult

client = OpenAI()

SYSTEM_PROMPT = """
You are an academic document analysis engine.

Extract ALL actionable academic deadlines from the input.

Rules:
- Extract multiple deadlines if present
- Do NOT guess dates
- Use null if date is missing
- Return ONLY valid JSON

Schema:
{
  "items": [
    {
      "title": "string",
      "due_date": "YYYY-MM-DD or null",
      "amount": number or null,
      "confidence": number between 0 and 1
    }
  ]
}
"""


def analyze_text_with_ai(text: str) -> ExtractionResult:
    response = client.responses.create(
        model="gpt-4.1-mini",
        input=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": text},
        ],
        temperature=0,
        max_output_tokens=500,
    )

    return ExtractionResult(**json.loads(response.output_text))


def analyze_pdf_with_ai(file_bytes: bytes, filename: str) -> ExtractionResult:
    uploaded = client.files.create(
        file=(filename, file_bytes),
        purpose="assistants",
    )

    response = client.responses.create(
        model="gpt-4.1-mini",
        input=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {
                "role": "user",
                "content": [
                    {"type": "input_file", "file_id": uploaded.id}
                ],
            },
        ],
        temperature=0,
        max_output_tokens=800,
    )

    return ExtractionResult(**json.loads(response.output_text))
