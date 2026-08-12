from pydantic import BaseModel, EmailStr

# Product Schema
class Product(BaseModel):
    id: int
    name: str
    description: str
    price: float
    quantity: int


# Registration Schema
class UserRegister(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    password: str


# Login Schema
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# Token Response
class Token(BaseModel):
    access_token: str
    token_type: str
    firstname: str