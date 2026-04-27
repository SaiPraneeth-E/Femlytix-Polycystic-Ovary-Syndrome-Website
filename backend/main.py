from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from routers import predict, reports
import os
from dotenv import load_dotenv

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: preload models
    from services.ml_pipeline import load_models
    print("[STARTUP] Preloading AI models...")
    load_models()
    print("[STARTUP] Models ready.")
    yield
    # Shutdown
    print("[SHUTDOWN] Cleaning up...")

app = FastAPI(title="Femlytix AI Backend", version="2.0.0", lifespan=lifespan)

# CORS setup
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://pcos-platform.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict.router)
app.include_router(reports.router)

def ping_ml_service():
    from services.ml_pipeline import ML_SERVICE_URL
    import requests
    try:
        requests.get(f"{ML_SERVICE_URL.rstrip('/')}/health", timeout=3.0)
    except Exception as e:
        print(f"[WAKEUP] ML Service wakeup ping failed/timeout: {e}")

@app.get("/health")
def root(background_tasks: BackgroundTasks):
    background_tasks.add_task(ping_ml_service)
    return {"status": "healthy", "service": "PCOS AI Backend v2.0"}
