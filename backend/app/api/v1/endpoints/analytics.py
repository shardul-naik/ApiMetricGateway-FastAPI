from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.core.database import get_db
from backend.app.api.deps import get_current_user, require_admin
from backend.app.models.user import User
from backend.app.schemas import analytics as analytics_schemas
from backend.app.services.analytics import calculate_user_analytics, calculate_admin_analytics

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/summary", response_model=analytics_schemas.AnalyticsSummaryResponse)
def get_analytics_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    user_id_val = int(getattr(current_user, "id"))
    return calculate_user_analytics(db=db, user_id=user_id_val)

@router.get("/admin-summary")
def get_admin_summary(db: Session = Depends(get_db), admin: User = Depends(require_admin)):
    return calculate_admin_analytics(db=db)
