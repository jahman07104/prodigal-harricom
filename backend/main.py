"""Compatibility entrypoint for uvicorn main:app."""

from app.main import build_application

app = build_application()
