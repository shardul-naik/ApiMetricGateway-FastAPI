import os
from typing import Generator
from sqlalchemy import create_engine
from sqlalchemy.engine import make_url
from sqlalchemy.orm import declarative_base, sessionmaker
from backend.app.core.config import DATABASE_URL

database_host = make_url(str(DATABASE_URL)).host or ""
ssl_mode = os.getenv("DATABASE_SSL", "auto").lower()
use_ssl = ssl_mode == "true" or (
    ssl_mode == "auto" and database_host not in {"localhost", "127.0.0.1", "::1"}
)

engine = create_engine(
    str(DATABASE_URL),
    pool_pre_ping=True,
    connect_args={"ssl": {}} if use_ssl else {},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
