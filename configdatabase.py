import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set in .env")

engine = create_engine(
    DATABASE_URL,
    connect_args={
        "ssl_disabled": False,
        "ssl_verify_cert": False,
        "ssl_verify_identity": False,
    },
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)