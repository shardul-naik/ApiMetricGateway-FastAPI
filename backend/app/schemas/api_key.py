from datetime import datetime
from pydantic import BaseModel

class APIKeyResponse(BaseModel):
    id: int
    key: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True