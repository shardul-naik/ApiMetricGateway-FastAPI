import secrets
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.core.database import get_db
from backend.app.api.deps import get_current_user, require_admin
from backend.app.models.user import User
from backend.app.models.api_key import APIKey
from backend.app.schemas import api_key as key_schemas

router = APIRouter(prefix="/keys", tags=["API Keys"])

def generate_api_key_string() -> str:
    return f"apm_{secrets.token_urlsafe(32)}"

@router.post("/generate", response_model=key_schemas.APIKeyResponse, status_code=201)
def create_key(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    user_id_val = int(getattr(current_user, "id"))
    api_key = APIKey(key=generate_api_key_string(), user_id=user_id_val)
    db.add(api_key)
    db.commit()
    db.refresh(api_key)
    return api_key

@router.get("/", response_model=List[key_schemas.APIKeyResponse])
def list_keys(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    user_id_val = int(getattr(current_user, "id"))
    return db.query(APIKey).filter(APIKey.user_id == user_id_val).all()

@router.put("/revoke/{key_id}")
def revoke_key(key_id: int, db: Session = Depends(get_db), admin: User = Depends(require_admin)):
    key_obj = db.query(APIKey).filter(APIKey.id == key_id).first()
    if not key_obj:
        raise HTTPException(status_code=404, detail="API Key not found")
    
    setattr(key_obj, "is_active", False)
    db.commit()
    return {"message": f"API Key #{key_id} has been revoked successfully.", "is_active": False}
