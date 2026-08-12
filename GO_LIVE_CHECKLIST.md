# HarriCom Go-Live Checklist

Use this checklist to verify your HarriCom templates platform is production-ready before launching.

---

## Database & Infrastructure

- [ ] **Database provisioned**
  - [ ] PostgreSQL instance running (or SQLite backup strategy for small scale)
  - [ ] Database user/password set and secure
  - [ ] Database accessible from deployment environment
  - [ ] Backup strategy in place (daily snapshots recommended)
  
- [ ] **Environment variables configured**
  - [ ] `DATABASE_URL` points to production database
  - [ ] `ADMIN_TOKEN` is a strong random value (not placeholder)
  - [ ] `STRIPE_SECRET_KEY` is a production secret key stored only in the host secret manager
  - [ ] `STRIPE_WEBHOOK_SECRET` is actual Stripe production key (not test)
  - [ ] `STRIPE_PRODUCT_CATALOG_JSON` maps each purchasable product code to a live Stripe Price ID
  - [ ] `WIPAY_WEBHOOK_SECRET` is actual WiPay production key (not test)
  - [ ] `ENVIRONMENT=production` set
  - [ ] All secrets stored securely (platform secrets manager, not committed to Git)

- [ ] **Container/deployment platform ready**
  - [ ] Docker image builds without errors
  - [ ] `start.sh` runs migrations successfully on fresh container spin
  - [ ] API starts and listens on the correct port
  - [ ] No hardcoded test values in code or config

---

## API & Backend

- [ ] **Health check passes**
  - [ ] `GET /healthz` returns HTTP 200
  - [ ] API is reachable from the internet (or your network)

- [ ] **Payment endpoints working**
  - [ ] `/orders` POST endpoint accepts valid order payloads
  - [ ] Order creation generates payment link
  - [ ] Payment link is a valid Stripe or WiPay URL
  - [ ] Webhook endpoint `/payments/webhook/stripe` is accessible and secured

- [ ] **Admin diagnostics secured**
  - [ ] `/payments/webhooks/diagnostics` requires `Authorization: Bearer <ADMIN_TOKEN>`
  - [ ] Test with invalid token returns 401 Unauthorized
  - [ ] Test with valid token returns webhook attempt data

- [ ] **Database migrations**
  - [ ] Alembic tracks all 3 revisions (98f60682f4f4, e18bb7693461, 92bf3d9fe7c4)
  - [ ] All tables exist and are accessible
  - [ ] No migration errors in startup logs

- [ ] **Tests pass**
  - [ ] Run `pytest -q` in backend directory
  - [ ] All 18+ tests pass with no warnings
  - [ ] No skipped tests that should be running

---

## Frontend & Templates

- [ ] **Homepage live**
  - [ ] HarriCom homepage loads at your custom domain
  - [ ] "Browse Business Templates" button links to catalog
  - [ ] "Chat on WhatsApp" button links to correct WhatsApp number
  - [ ] Floating WhatsApp chat button visible and functional

- [ ] **Catalog displays correctly**
  - [ ] All 19 template categories load
  - [ ] Customs Broker card shows branded preview image
  - [ ] Template cards are clickable and link to detail pages

- [ ] **Customs Broker demo template updated**
  - [ ] Template title is "Prodigal Customs Demo Template"
  - [ ] Contact WhatsApp number is your actual number (not 18760000000)
  - [ ] Contact email is accurate
  - [ ] Duty estimator form loads and is functional
  - [ ] "Request Exact Estimate" button links to WhatsApp with pre-filled message
  - [ ] Testimonial and case-study sections display with proper styling
  - [ ] Hero trust bar shows all 4 trust signals (JCA Licensed, etc.)

- [ ] **All templates updated with your WhatsApp**
  - [ ] Search for "Replace all " in all template files
  - [ ] Replace with your primary WhatsApp number
  - [ ] Verify all CTA links work end-to-end

- [ ] **Mobile responsiveness**
  - [ ] Test homepage on iPhone and Android
  - [ ] Floating WhatsApp button doesn't overlap critical content
  - [ ] Forms are touch-friendly on mobile
  - [ ] Text is readable without zoom

---

## Payment Integration

- [ ] **Stripe integration (if using)**
- [ ] Stripe secret API key is production key
- [ ] Webhook URL in Stripe dashboard points to `/payments/webhook/stripe`
  - [ ] Webhook signature verification uses production secret
- [ ] Stripe Checkout Session is created only for a server-configured `price_...` ID
- [ ] Test a Stripe test-mode payment and receive its webhook callback
  - [ ] Payment attempts are logged in admin diagnostics

- [ ] **WiPay integration (if using)**
  - [ ] Test API key is production key
  - [ ] Webhook URL in WiPay dashboard points to `/payments/webhooks`
  - [ ] Webhook signature verification uses production secret
  - [ ] Test creating an order and receiving webhook callback

- [ ] **Payment link flow end-to-end**
  - [ ] User clicks "Order" on a template
  - [ ] Payment form loads
  - [ ] Order is created in database
  - [ ] Payment link is generated (Stripe or WiPay)
  - [ ] User can click payment link (don't need to complete payment, just verify link works)
  - [ ] Webhook attempt is logged when payment completes

---

## Security

- [ ] **HTTPS enabled**
  - [ ] Custom domain has valid SSL certificate
  - [ ] All pages load over HTTPS (no mixed content warnings)
  - [ ] SSL test passes (e.g., https://ssltest.ssllabs.com/)

- [ ] **Headers secured**
  - [ ] Content-Security-Policy header set
  - [ ] X-Frame-Options header set (prevent clickjacking)
  - [ ] X-Content-Type-Options set to nosniff

- [ ] **Secrets not exposed**
  - [ ] No API keys in frontend code (git grep ADMIN_TOKEN, STRIPE_, WIPAY_)
  - [ ] .env file is in .gitignore
  - [ ] No debug=True in FastAPI config
  - [ ] Error responses don't leak sensitive data

- [ ] **CORS configured correctly**
  - [ ] `ALLOWED_ORIGINS` in .env doesn't include wildcards (or is locked to your domain)
  - [ ] Payment endpoints only accept POST from expected origins

---

## Monitoring & Ops

- [ ] **Logs accessible**
  - [ ] Can view API logs from your deployment platform
  - [ ] Can filter by level (INFO, WARNING, ERROR)
  - [ ] Error logs don't contain secrets

- [ ] **Database backups**
  - [ ] Automated daily backups configured
  - [ ] Backup storage is encrypted and separate from main database
  - [ ] Test restore from backup at least once

- [ ] **Uptime monitoring (optional but recommended)**
  - [ ] Health check endpoint monitored (e.g., Uptime Robot)
  - [ ] Alerts configured for downtime
  - [ ] Team knows how to respond to alerts

- [ ] **Performance baseline**
  - [ ] Response time for /health is < 200ms
  - [ ] Order creation endpoint responds in < 500ms
  - [ ] No N+1 query issues in webhook diagnostics endpoint

---

## Deployment Procedure

- [ ] **Pre-deployment**
  - [ ] All code committed and pushed to main branch
  - [ ] Latest migrations are in `backend/migrations/versions/`
  - [ ] No TODO comments or debug print statements
  - [ ] Version bump in package metadata (optional)

- [ ] **Deployment**
  - [ ] Follow DEPLOYMENT.md steps for your platform
  - [ ] Verify migrations run successfully in startup logs
  - [ ] Health check returns 200 OK
  - [ ] No errors in error logs

- [ ] **Post-deployment**
  - [ ] Test homepage loads from custom domain
  - [ ] Test template catalog loads
  - [ ] Test payment link creation
  - [ ] Verify webhook can receive test events
  - [ ] Create a test order end-to-end

- [ ] **Rollback plan**
  - [ ] Keep previous Docker image tag available
  - [ ] Know how to revert code and redeploy quickly
  - [ ] Have database backup from before deployment

---

## Final Sign-Off

- [ ] I have tested this deployment in a staging environment first
- [ ] All checklist items above are complete
- [ ] I have informed stakeholders of the launch
- [ ] I have WhatsApp configured to receive customer orders
- [ ] I am ready to monitor the platform after launch

**Launch Date:** _________________

**Deployed By:** _________________

**Notes:** ________________________________________________________________________

___________________________________________________________________________

---

## Quick Rollback

If something goes wrong immediately after launch:

1. **Revert to previous build:**
   - Redeploy the previous Docker image tag
   - Or roll back the Git commit and redeploy

2. **Check logs for specific errors:**
   - Migration failures: Verify DATABASE_URL and database state
   - Payment failures: Verify webhook secrets are correct
   - Frontend issues: Check browser console for 404s or CSP errors

3. **Recover from bad migration:**
   ```bash
   alembic downgrade -1  # Roll back one migration
   # Fix the migration or data, then redeploy
   ```

4. **Contact your deployment platform support** if you can't quickly identify the issue.

**Never leave the platform in an unknown state.** Either you know it's working or you've rolled it back.
