from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, HTMLResponse
import uvicorn
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from api import cpu, gpu, memory, disk, network, temperature, processes, system
from config import settings

app = FastAPI(
    title=settings.API_TITLE,
    version=settings.API_VERSION,
    docs_url=settings.API_DOCS_URL,
    redoc_url="/redoc",
)

@app.get("/api/system")
async def get_system():
    return system.get_system_info()

@app.get("/api/cpu")
async def get_cpu():
    return cpu.get_cpu_info()

@app.get("/api/memory")
async def get_memory():
    return memory.get_memory_info()

@app.get("/api/disk")
async def get_disk():
    return disk.get_disk_info()

@app.get("/api/network")
async def get_network():
    return network.get_network_info()

@app.get("/api/temperature")
async def get_temperature():
    return temperature.get_temperature()

@app.get("/api/gpu")
async def get_gpu():
    return gpu.get_gpu_info()

@app.get("/api/processes")
async def get_processes():
    return processes.get_top_processes()

static_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend/dist")
assets_path = os.path.join(static_path, "assets")
index_path = os.path.join(static_path, "index.html")

if os.path.isdir(assets_path):
    app.mount("/assets", StaticFiles(directory=assets_path), name="assets")

@app.get("/")
async def root():
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return HTMLResponse("<h1>Linux Monitor System</h1><p>Frontend not built yet.</p>")

@app.get("/{full_path:path}")
async def spa_fallback(full_path: str):
    requested = os.path.join(static_path, full_path)
    if os.path.isfile(requested):
        return FileResponse(requested)
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return HTMLResponse("<h1>Linux Monitor System</h1><p>Frontend not built yet.</p>", status_code=404)

if __name__ == "__main__":
    uvicorn.run("main:app", host=settings.APP_HOST, port=settings.APP_PORT, reload=False, log_level="info")
