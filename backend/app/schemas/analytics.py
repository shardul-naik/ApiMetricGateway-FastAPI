from typing import Dict
from pydantic import BaseModel

class AnalyticsSummaryResponse(BaseModel):
    total_requests: int
    avg_latency_ms: float
    max_latency_ms: float
    status_breakdown: Dict[int, int]