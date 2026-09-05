from fastapi import APIRouter
from backend.app.api.v1.endpoints import auth, keys, analytics, mocks

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(keys.router)
api_router.include_router(analytics.router)
api_router.include_router(mocks.router)
