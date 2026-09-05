import pandas as pd
from sqlalchemy.orm import Session
from backend.app.models.user import User
from backend.app.models.api_key import APIKey
from backend.app.models.request_log import RequestLog

def calculate_user_analytics(db: Session, user_id: int):
    user_keys = db.query(APIKey.id).filter(APIKey.user_id == user_id).all()
    key_ids = [k.id for k in user_keys]

    if not key_ids:
        return {"total_requests": 0, "avg_latency_ms": 0.0, "max_latency_ms": 0.0, "status_breakdown": {}}

    logs = db.query(RequestLog).filter(RequestLog.key_id.in_(key_ids)).all()
    
    if not logs:
        return {"total_requests": 0, "avg_latency_ms": 0.0, "max_latency_ms": 0.0, "status_breakdown": {}}

    df = pd.DataFrame([{
        "endpoint": log.endpoint,
        "status_code": log.status_code,
        "response_time_ms": log.response_time_ms
    } for log in logs])

    return {
        "total_requests": int(len(df)),
        "avg_latency_ms": float(round(df["response_time_ms"].mean(), 2)),
        "max_latency_ms": float(round(df["response_time_ms"].max(), 2)),
        "status_breakdown": df["status_code"].value_counts().to_dict()
    }

def calculate_admin_analytics(db: Session):
    total_users = db.query(User).filter(User.role == "user").count()
    total_keys = db.query(APIKey).count()
    logs = db.query(RequestLog).all()

    if not logs:
        user_activity = []
        users = db.query(User).filter(User.role == "user").all()
        for u in users:
            u_id = int(getattr(u, "id"))
            u_keys = db.query(APIKey).filter(APIKey.user_id == u_id).all()
            user_activity.append({
                "user_id": u_id,
                "email": str(u.email),
                "keys": [{"id": k.id, "key": k.key, "is_active": k.is_active} for k in u_keys],
                "total_requests": 0,
                "avg_latency_ms": 0.0
            })
        return {
            "total_system_users": total_users,
            "total_keys_issued": total_keys,
            "total_system_requests": 0,
            "global_avg_latency_ms": 0.0,
            "user_activity": user_activity,
            "status_breakdown": {}
        }

    df = pd.DataFrame([{"key_id": l.key_id, "endpoint": l.endpoint, "status_code": l.status_code, "latency": l.response_time_ms} for l in logs])
    
    user_activity = []
    users = db.query(User).filter(User.role == "user").all()
    for u in users:
        u_id = int(getattr(u, "id"))
        u_keys = db.query(APIKey).filter(APIKey.user_id == u_id).all()
        u_key_ids = [k.id for k in u_keys]
        
        user_df = df[df["key_id"].isin(u_key_ids)] if not df.empty else pd.DataFrame()
        req_count = len(user_df) if not user_df.empty else 0
        avg_lat = float(round(user_df["latency"].mean(), 2)) if req_count > 0 else 0.0

        user_activity.append({
            "user_id": u_id,
            "email": str(u.email),
            "keys": [{"id": k.id, "key": k.key, "is_active": k.is_active} for k in u_keys],
            "total_requests": req_count,
            "avg_latency_ms": avg_lat
        })

    status_counts = df["status_code"].value_counts().to_dict() if not df.empty else {}

    return {
        "total_system_users": total_users,
        "total_keys_issued": total_keys,
        "total_system_requests": len(df),
        "global_avg_latency_ms": float(round(df["latency"].mean(), 2)),
        "user_activity": user_activity,
        "status_breakdown": {str(k): int(v) for k, v in status_counts.items()}
    }
