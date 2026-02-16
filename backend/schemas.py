from pydantic import BaseModel
from typing import List, Optional

class DeadlineItem(BaseModel):
    title: str
    due_date: Optional[str]
    amount: Optional[float]
    confidence: float

class ExtractionResult(BaseModel):
    items: List[DeadlineItem]
