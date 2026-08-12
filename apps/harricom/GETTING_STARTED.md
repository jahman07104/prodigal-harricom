# HarriCom Templates — Getting Started for Go-Live

Your HarriCom templates platform is ready for production. Follow this guide to launch.

## Quick Start (5 minutes)

1. **Read the Deployment Guide:**
   - [DEPLOYMENT.md](DEPLOYMENT.md) — Choose your platform (Replit, Render, Railway, or Docker/VPS)

2. **Prepare Your Environment:**
   - Copy `backend/.env.example` to `backend/.env`
   - Fill in production values (database, webhook secrets, admin token)

3. **Check the Go-Live Checklist:**
   - [GO_LIVE_CHECKLIST.md](GO_LIVE_CHECKLIST.md) — Verify everything before launch
   - Test one item from each section to confirm readiness

4. **Deploy:**
   - Follow the step-by-step guide for your chosen platform

5. **Monitor:**
   - Watch logs for migration errors
   - Test a complete order flow (create order → payment → webhook)

---

## Directory Structure

```
harriCom-templates/
├── index.html                 # Homepage with WhatsApp chat button
├── styles.css                 # Global dark theme + responsive design
├── catalog/                   # Template discovery page
│   └── index.html
├── customs-broker/            # Premium Prodigal Customs demo
│   ├── index.html             # (Duty estimator + testimonials)
│   └── styles.css
├── [other-templates]/         # 17 other template categories
├── admin/
│   └── whatsapp-diagnostics.html  # Webhook analytics (cursor pagination)
├── assets/
│   ├── images/optimized/
│   │   └── customs-broker-preview.svg  # Catalog card preview
│   └── icons/
├── backend/                   # FastAPI server
│   ├── main.py                # App entry
│   ├── start.sh               # Container startup (migrations + API)
│   ├── Dockerfile             # Production image definition
│   ├── .env.example           # Configuration template
│   ├── requirements.txt        # Python dependencies
│   ├── app/
│   │   ├── api/routes/        # /orders, /payments/webhooks, etc.
│   │   ├── models/            # SQLAlchemy schemas
│   │   ├── services/          # Business logic
│   │   └── db/                # Database session, base models
│   ├── migrations/
│   │   └── versions/          # Alembic schema migrations
│   └── tests/                 # pytest tests (18 passing)
├── DEPLOYMENT.md              # Platform-specific guides
├── GO_LIVE_CHECKLIST.md       # Pre-launch verification
└── READ.md                    # Original starter kit docs
```

---

## Key Files for Go-Live

| File | Purpose | Action |
|------|---------|--------|
| `backend/.env.example` | Configuration template | Copy to `.env`, fill production values |
| `DEPLOYMENT.md` | Platform guides | Choose platform, follow steps |
| `GO_LIVE_CHECKLIST.md` | Launch verification | Check off each item before deploying |
| `backend/start.sh` | Container startup | Runs migrations, then API (no manual setup needed) |
| `backend/Dockerfile` | Docker image | Already configured, ready to build |

---

## Environment Variables You'll Need

Before deploying anywhere, generate these:

```bash
# Secure admin token (run in terminal):
python -c "import secrets; print(secrets.token_hex(32))"

# Then fill in .env:
DATABASE_URL=postgresql://user:pass@host:5432/harricom_db
ADMIN_TOKEN=<generated above>
STRIPE_WEBHOOK_SECRET=whsec_... (from Stripe Dashboard)
WIPAY_WEBHOOK_SECRET=... (from WiPay Dashboard)
```

See `backend/.env.example` for all options.

---

## Deployment Platforms

| Platform | Ease | Cost | Setup Time | Link |
|----------|------|------|------------|------|
| **Replit** | ⭐⭐⭐⭐⭐ | Free+ | 2 min | See DEPLOYMENT.md → Replit |
| **Render** | ⭐⭐⭐⭐⭐ | Free→$7/mo | 5 min | See DEPLOYMENT.md → Render |
| **Railway** | ⭐⭐⭐⭐⭐ | Free→$5/mo | 5 min | See DEPLOYMENT.md → Railway |
| **Docker/VPS** | ⭐⭐⭐ | $5+/mo | 30 min | See DEPLOYMENT.md → Docker + VPS |

**Recommendation for first launch:** Start with **Replit** or **Render** (fastest, handles scaling, free tier available).

---

## Pre-Launch Checklist (TL;DR)

- [ ] Database provisioned and accessible
- [ ] `DATABASE_URL` points to production database
- [ ] `ADMIN_TOKEN` is a strong random string (not placeholder)
- [ ] Webhook secrets (Stripe/WiPay) are production keys
- [ ] Homepage loads (WhatsApp chat button visible)
- [ ] Catalog loads (Customs Broker card shows preview image)
- [ ] Order creation works end-to-end
- [ ] Health check passes: `GET /health` → `{"status": "ok"}`
- [ ] Admin endpoint requires auth: `/payments/webhooks/diagnostics`

Full checklist: [GO_LIVE_CHECKLIST.md](GO_LIVE_CHECKLIST.md)

---

## API Endpoints (Post-Deployment)

After deploying, test these:

```bash
# Health check
curl https://your-api.com/health

# Admin diagnostics (requires ADMIN_TOKEN)
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  https://your-api.com/payments/webhooks/diagnostics

# Create an order
curl -X POST https://your-api.com/orders \
  -H "Content-Type: application/json" \
  -d '{"customer_email":"test@example.com",...}'
```

Full API docs auto-generated at `/docs` (FastAPI Swagger UI).

---

## FAQ

**Q: I want to test locally first. Can I?**  
A: Yes. Run `python -m pytest -q` in `backend/` to verify tests pass. For local API, see `backend/main.py` for FastAPI docs at `http://localhost:8000/docs`.

**Q: Do I need to update WhatsApp numbers in templates?**  
A: Yes. Search for `Replace all ` in all files and replace with your actual WhatsApp number.

**Q: What if the database migration fails?**  
A: Check that `DATABASE_URL` is correct and the database exists. See DEPLOYMENT.md → Troubleshooting.

**Q: Can I use SQLite in production?**  
A: Not recommended for production. Use PostgreSQL. SQLite is fine for testing.

**Q: How do I access the admin dashboard?**  
A: Navigate to `/admin/whatsapp-diagnostics.html` (auth via ADMIN_TOKEN in JavaScript).

**Q: What's the payment webhook flow?**  
A: Stripe/WiPay sends webhook → `/payments/webhooks` endpoint → verified with secret → logged to `payment_webhook_attempts` table → visible in admin diagnostics.

---

## Support

- **Backend issues?** Check `backend/tests/` for examples or see `/docs` endpoint
- **Deployment issues?** See DEPLOYMENT.md → Troubleshooting
- **Payment issues?** See GO_LIVE_CHECKLIST.md → Payment Integration
- **Security questions?** See GO_LIVE_CHECKLIST.md → Security

---

## Next Steps

1. ✅ You're reading this
2. → Open `DEPLOYMENT.md`, pick your platform
3. → Copy `backend/.env.example` to `.env`, fill production values
4. → Deploy following platform-specific steps
5. → Go through `GO_LIVE_CHECKLIST.md` items
6. → Test order → payment → webhook flow
7. → Launch! 🚀

---

**Last updated:** April 2026  
**Status:** Ready for production deployment  
**Backend tests:** 18/18 passing  
**Frontend validation:** All checks passing  
