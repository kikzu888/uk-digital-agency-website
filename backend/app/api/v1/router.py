from fastapi import APIRouter

from app.api.v1.routes import admin, contact, health, news, portfolio, services

api_router = APIRouter()
api_router.include_router(health.router, tags=["system"])
api_router.include_router(services.router)
api_router.include_router(news.router)
api_router.include_router(portfolio.router)
api_router.include_router(admin.router)
api_router.include_router(contact.router)
