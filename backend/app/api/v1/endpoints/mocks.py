from typing import Optional
from fastapi import APIRouter, HTTPException, Header
from backend.app.core.database import SessionLocal
from backend.app.models.api_key import APIKey

router = APIRouter(prefix="/api/v1", tags=["Mock Services"])

@router.get("/weather")
def get_weather(location: str = "Mumbai", x_api_key: Optional[str] = Header(None)):
    if not x_api_key:
        raise HTTPException(status_code=401, detail="X-API-Key header required")
    key_obj = SessionLocal().query(APIKey).filter(APIKey.key == x_api_key, APIKey.is_active == True).first()
    if not key_obj:
        raise HTTPException(status_code=401, detail="Invalid or Revoked API Key")
    return {"service": "Weather API", "location": location, "temperature": "28°C", "condition": "Partly Cloudy", "humidity": "78%"}

@router.get("/stock")
def get_stock(symbol: str = "RELIANCE", x_api_key: Optional[str] = Header(None)):
    if not x_api_key:
        raise HTTPException(status_code=401, detail="X-API-Key header required")
    key_obj = SessionLocal().query(APIKey).filter(APIKey.key == x_api_key, APIKey.is_active == True).first()
    if not key_obj:
        raise HTTPException(status_code=401, detail="Invalid or Revoked API Key")
    return {"service": "Stock API", "symbol": symbol.upper(), "price_inr": 2940.50, "change": "+1.25%", "market_status": "OPEN"}

@router.get("/currency")
def get_currency(from_curr: str = "INR", to_curr: str = "USD", x_api_key: Optional[str] = Header(None)):
    if not x_api_key:
        raise HTTPException(status_code=401, detail="X-API-Key header required")
    key_obj = SessionLocal().query(APIKey).filter(APIKey.key == x_api_key, APIKey.is_active == True).first()
    if not key_obj:
        raise HTTPException(status_code=401, detail="Invalid or Revoked API Key")
    return {"service": "Currency API", "pair": f"{from_curr.upper()}/{to_curr.upper()}", "rate": 0.012, "converted_amount": "1000 INR = 12.00 USD"}
