from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import database_models

DATABASE_URL = "mysql+mysqlconnector://root:Saraswat%40123@localhost:3306/mydb"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

db = SessionLocal()

# Use the database
db.close()