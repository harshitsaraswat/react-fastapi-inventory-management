from fastapi import FastAPI
from models import Product, UserRegister, UserLogin, Token
import database_models
from configdatabase import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from security import hash_password, verify_password, create_access_token

app = FastAPI()
origins = [
    "http://localhost:3000",
    "https://YOUR-FRONTEND-URL.onrender.com",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
database_models.Base.metadata.create_all(bind=engine)

# Sample data
products = [
    Product(
        id=1,
        name="phone",
        description="a smartphone",
        price=699.66,
        quantity=50
    ),
    Product(
        id=2,
        name="laptop",
        description="a laptop",
        price=6990.66,
        quantity=500
    ),
    Product(
        id=5,
        name="pen",
        description="a pen",
        price=99.66,
        quantity=10
    )
]

# Insert sample data only once
def init_db():
    db = SessionLocal()

    if db.query(database_models.Product).count() == 0:
        for item in products:
            db.add(database_models.Product(**item.model_dump()))

        db.commit()

    db.close()


init_db()

# ===========================
# USER REGISTRATION
# ===========================

@app.post("/register")
def register(user: UserRegister):
    db = SessionLocal()

    try:
        existing_user = (
            db.query(database_models.User)
            .filter(database_models.User.email == user.email)
            .first()
        )

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )

        new_user = database_models.User(
            firstname=user.firstname,
            lastname=user.lastname,
            email=user.email,
            password=hash_password(user.password)
        )

        db.add(new_user)
        db.commit()

        return {
            "message": "Registration Successful"
        }

    finally:
        db.close()


# ===========================
# USER LOGIN
# ===========================

@app.post("/login", response_model=Token)
def login(user: UserLogin):
    db = SessionLocal()

    try:
        db_user = (
            db.query(database_models.User)
            .filter(database_models.User.email == user.email)
            .first()
        )

        if not db_user:
            raise HTTPException(
                status_code=401,
                detail="Invalid Email or Password"
            )

        if not verify_password(
            user.password,
            db_user.password
        ):
            raise HTTPException(
                status_code=401,
                detail="Invalid Email or Password"
            )

        token = create_access_token(
            {"sub": db_user.email}
        )

        return {
            "access_token": token,
            "token_type": "bearer",
            "firstname": db_user.firstname
        }

    finally:
        db.close()


@app.get("/")
def greet():
    return {"message": "Hello, welcome to your website"}


# Get all products
@app.get("/products")
def get_products():
    db = SessionLocal()

    try:
        products = db.query(database_models.Product).all()
        return products
    finally:
        db.close()


# Get product by ID
@app.get("/products/{id}")
def get_product(id: int):
    db = SessionLocal()

    try:
        product = (
            db.query(database_models.Product)
            .filter(database_models.Product.id == id)
            .first()
        )

        if product:
            return product

        return {"message": "Product not found"}

    finally:
        db.close()


# Add product
@app.post("/products")
def add_product(product: Product):
    db = SessionLocal()

    try:
        new_product = database_models.Product(**product.model_dump())

        db.add(new_product)
        db.commit()
        db.refresh(new_product)

        return new_product

    finally:
        db.close()


# Update product
@app.put("/products/{id}")
def update_product(id: int, product: Product):
    db = SessionLocal()

    try:
        db_product = (
            db.query(database_models.Product)
            .filter(database_models.Product.id == id)
            .first()
        )

        if not db_product:
            return {"message": "Product not found"}

        db_product.name = product.name
        db_product.description = product.description
        db_product.price = product.price
        db_product.quantity = product.quantity

        db.commit()
        db.refresh(db_product)

        return db_product

    finally:
        db.close()


# Delete product
@app.delete("/products/{id}")
def delete_product(id: int):
    db = SessionLocal()

    try:
        db_product = (
            db.query(database_models.Product)
            .filter(database_models.Product.id == id)
            .first()
        )

        if not db_product:
            return {"message": "Product not found"}

        db.delete(db_product)
        db.commit()

        return {"message": "Product deleted successfully"}

    finally:
        db.close()

@app.get("/test")
def test():
    return {"message": "Working"}