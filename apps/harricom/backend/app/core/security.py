from fastapi import HTTPException, Request, status


def require_admin_token(request: Request, admin_token: str) -> None:
    """Protect read/reporting routes; write ingestion remains public for tracking."""
    if not admin_token:
        return
    auth_header = request.headers.get("Authorization", "")
    provided = auth_header.removeprefix("Bearer ").strip()
    if provided != admin_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
