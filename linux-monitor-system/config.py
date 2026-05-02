from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_HOST: str = "0.0.0.0"
    APP_PORT: int = 8000
    API_TITLE: str = "Linux Monitor System"
    API_VERSION: str = "v1"
    API_DOCS_URL: str = "/docs"
    
    # UI Settings
    UI_REFRESH_RATE: int = 2  # seconds
    UI_MAX_PROCESSES: int = 10
    UI_DISK_MOUNTS: int = 5
    
    # Thresholds (optional alerting)
    CPU_THRESHOLD: float = 90.0
    MEMORY_THRESHOLD: float = 90.0
    DISK_THRESHOLD: float = 95.0
    GPU_TEMP_THRESHOLD: float = 85.0
    CPU_TEMP_THRESHOLD: float = 85.0
    
    # Monitoring
    ENABLE_GPU: bool = True
    ENABLE_SENSORS: bool = True
    ENABLE_NETWORK: bool = True
    ENABLE_PROCESSES: bool = True
    ENABLE_DISK: bool = True
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
