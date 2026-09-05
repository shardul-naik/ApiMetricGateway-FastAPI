from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.core.database import engine, Base
from backend.app.middleware.telemetry import TelemetryMiddleware
from backend.app.api.v1.router import api_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="APIMetric API", version="1.0.0")

app.add_middleware(TelemetryMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.get("/", tags=["Health"])
def read_root():
    return {"status": "online", "message": "APIMetric Gateway Active"}
