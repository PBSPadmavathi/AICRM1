from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base

app = FastAPI()

# Allow all origins for development (update for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI Backend!"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
