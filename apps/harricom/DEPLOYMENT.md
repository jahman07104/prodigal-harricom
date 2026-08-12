# HarriCom Deployment Runbook

This guide covers deploying HarriCom templates platform to production on various platforms.

## Prerequisites

- Docker installed (for containerized deployment)
- Git repository access
- Environment variables from `backend/.env.example` populated with production values
- Database (PostgreSQL recommended for production; SQLite works for small deployments)

## Environment Setup

Before deploying anywhere, create your `.env` file in the `backend/` directory:

```bash
cd backend
cp .env.example .env
# Edit .env with your production values
```

**Required variables:**

- `DATABASE_URL`: PostgreSQL or SQLite connection string
- `ADMIN_TOKEN`: Strong random token for admin endpoints
- `STRIPE_SECRET_KEY`: Stripe secret API key (`sk_live_...`) for creating Checkout Sessions
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook signing secret (`whsec_...`)
- `STRIPE_CHECKOUT_ALLOWED_ORIGINS`: Comma-separated allowed return origins, such as `https://harricom.netlify.app`
- `STRIPE_PRODUCT_CATALOG_JSON`: Product-code to Stripe Price ID mapping; do not put prices in browser code
- `WIPAY_WEBHOOK_SECRET`: (if using WiPay payments)

Generate a secure `ADMIN_TOKEN`:

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

## Next.js Security Services

Configure these variables in the hosting provider's encrypted environment-variable settings.
Do not commit them to `.env.local`.

- `OPENAI_API_KEY` or `GEMINI_API_KEY`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `ALLOWED_ORIGIN` (the production site origin)
- `FIREBASE_ADMIN_PROJECT_ID`, `FIREBASE_ADMIN_CLIENT_EMAIL`, and
  `FIREBASE_ADMIN_PRIVATE_KEY` when Firebase Admin is enabled

The Next.js production build rejects deployments without both Upstash variables.
Deploy Firestore rules after selecting a Firebase project:

```bash
npx firebase-tools use <firebase-project-id>
npx firebase-tools deploy --only firestore:rules,firestore:indexes
```

---

## Deployment Platforms

### 1. Replit

**Steps:**

1. **Create a Replit project from your GitHub repo** or upload the directory
2. **Set environment variables** in Replit Secrets panel:
   - Click on Secrets (lock icon)
   - Add each variable from your `.env` file
3. **Configure the run button:**
   - In `.replit`, set:
     ```
     run = "cd backend && sh start.sh"
     ```
4. **Deploy:**
   - Click Run. Replit will execute `start.sh`, which automatically runs migrations and starts the API
   - Your app is live at the Replit URL (e.g., `https://yourproject.replit.dev`)

**Pros:** Free tier, built-in PostgreSQL option, instant deploys  
**Cons:** Limited to Replit's specs, may sleep on free tier

---

### 2. Render

**Steps:**

1. **Create from blueprint:** In Render, select **New +** → **Blueprint** and connect this repository. Render reads `render.yaml` and builds `backend/Dockerfile`.
2. **Provision PostgreSQL:** Add a Render PostgreSQL database, then set the API service's `DATABASE_URL` to its internal connection string. Do not use SQLite for production.
3. **Set the secret environment variables:** `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `STRIPE_PRODUCT_CATALOG_JSON`. Keep all values in Render's secret manager; never commit them.
4. **Deploy:** The service runs migrations through `backend/start.sh`. Confirm `https://<render-service>.onrender.com/healthz` returns HTTP 200.

### Stripe Checkout setup

1. In Stripe Dashboard, create the Prodigal service product and its one-time Price. Copy its `price_...` ID.
2. In Render, set `STRIPE_PRODUCT_CATALOG_JSON` to a server-side mapping, for example:

   ```json
   {"prodigal-consultation":{"title":"Prodigal Consultation","price_id":"price_123"}}
   ```

3. Set `STRIPE_CHECKOUT_ALLOWED_ORIGINS=https://harricom.netlify.app` and include any custom domain once it is live.
4. In Stripe Dashboard → Developers → Webhooks, register:

   ```text
   https://<render-service>.onrender.com/payments/webhook/stripe
   ```

   Select `checkout.session.completed`, `checkout.session.expired`, `payment_intent.succeeded`, `payment_intent.payment_failed`, and `payment_intent.processing`. Copy the endpoint signing secret to `STRIPE_WEBHOOK_SECRET`.
5. Start in Stripe test mode. Call `POST /payments/stripe/checkout-session` from the Prodigal purchase UI with a configured `product_code`; its response contains the Stripe-hosted URL to redirect the customer to. Do not expose this route in the site until the specific service, price, and purchase UI are approved.

**Pros:** Free tier with persistent database, auto-scaling, easy GitHub integration  
**Cons:** Slight cold start delay on free tier

---

### 3. Railway

**Steps:**

1. **Create a new project** on railway.app
2. **Add a service from your GitHub repo** (or upload Git URL)
3. **Railway auto-detects the Dockerfile:**
   - Will use `backend/Dockerfile` for the API
   - Builds and deploys automatically
4. **Set Environment Variables** in Railway dashboard:
   - Add all variables from `backend/.env`
5. **Add a PostgreSQL plugin** (optional):
   - Railway auto-injects `DATABASE_URL` for the linked database
6. **Deploy:**
   - Railway handles the build and start (reads `Dockerfile` CMD which is `start.sh`)
   - `start.sh` runs migrations before the API starts

**Pros:** Clean Docker support, PostgreSQL add-on, very straightforward  
**Cons:** Paid plans start quickly

---

### 4. Docker + VPS (Self-Hosted)

For AWS EC2, DigitalOcean, Linode, or any VPS:

**Steps:**

1. **Build the Docker image:**

   ```bash
   cd backend
   docker build -t harricom-api:latest .
   ```

2. **Push to a registry** (Docker Hub, GitHub Container Registry, or private):

   ```bash
   docker tag harricom-api:latest yourregistry/harricom-api:latest
   docker push yourregistry/harricom-api:latest
   ```

3. **On your VPS, create a `.env` file** with production values:

   ```bash
   cat > /opt/harricom/.env << EOF
   DATABASE_URL=postgresql://user:password@localhost:5432/harricom_db
   ADMIN_TOKEN=<your_secure_token>
   STRIPE_WEBHOOK_SECRET=<your_key>
   WIPAY_WEBHOOK_SECRET=<your_key>
   PORT=8000
   ENVIRONMENT=production
   EOF
   ```

4. **Run the container:**

   ```bash
   docker run -d \
     --name harricom-api \
     --restart unless-stopped \
     --env-file /opt/harricom/.env \
     -p 8000:8000 \
     yourregistry/harricom-api:latest
   ```

5. **Set up reverse proxy** (Nginx/Caddy):

   ```nginx
   server {
       server_name api.harricom.com;
       listen 80;

       location / {
           proxy_pass http://localhost:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

6. **Enable HTTPS** (Let's Encrypt via Certbot):
   ```bash
   sudo certbot --nginx -d api.harricom.com
   ```

**Pros:** Full control, no vendor lock-in, can use any database  
**Cons:** Requires DevOps knowledge, manual scaling

---

## Post-Deployment Verification

After deploying to any platform:

1. **Check API health:**

   ```bash
   curl https://your-api-url/healthz
   # Should return: {"status": "ok"}
   ```

2. **Verify admin endpoint** (with your ADMIN_TOKEN):

   ```bash
   curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
     https://your-api-url/payments/webhooks/diagnostics
   ```

3. **Test a payment link** (from the catalog):
   - Create an order via the frontend
   - Verify payment link is generated
   - Test the webhook callback by simulating a payment

4. **Check logs** for migration errors:
   - Replit: View in console
   - Render: Logs tab
   - Railway: Logs tab
   - VPS: `docker logs harricom-api`

---

## Database Migration

The `start.sh` script automatically runs `alembic upgrade head` before starting the API. This means:

- **Fresh deployments:** Migrations run automatically on first boot
- **No downtime:** Migrations are applied before the API accepts requests
- **Idempotent:** Safe to re-run; Alembic tracks which migrations have been applied

If you ever need to manually roll back:

```bash
# In the backend directory with alembic.ini present:
alembic downgrade -1  # Roll back one migration
alembic current       # Check current version
```

---

## Troubleshooting

### "Migration failed" error in logs

- Check that `DATABASE_URL` is correct and the database is accessible
- Verify the database user has CREATE TABLE permissions
- For PostgreSQL, ensure the database exists: `createdb harricom_db`

### "Port already in use"

- If running locally, change `PORT` in `.env`
- On a VPS, ensure firewall allows the port

### Webhook payloads not being stored

- Verify `STRIPE_WEBHOOK_SECRET` and `WIPAY_WEBHOOK_SECRET` are correct
- Check admin logs with `/payments/webhooks/diagnostics` endpoint
- Confirm webhook URLs in Stripe/WiPay dashboards point to your API

### Admin token not working

- Regenerate token: `python -c "import secrets; print(secrets.token_hex(32))"`
- Update `ADMIN_TOKEN` in `.env` (or platform's secret manager)
- Restart the API

---

## Rollback Plan

If deployment fails:

1. **Revert code:**

   ```bash
   git revert <commit_hash>
   git push
   ```

   Your platform will auto-redeploy the previous version.

2. **Rollback database migration:**
   - Check `backend/migrations/versions/` for the previous revision ID
   - SSH into your database and run: `alembic downgrade <revision_id>`
   - Or redeploy with a rollback migration (create new migration reversing changes)

3. **Docker quick rollback:**
   ```bash
   docker stop harricom-api
   docker run -d --name harricom-api-prev <previous_image_tag>
   ```

---

## Next Steps

1. Set up custom domain (DNS CNAME to your platform)
2. Enable SSL/HTTPS (automatic on Render/Railway, manual on VPS)
3. Configure payment webhooks in Stripe/WiPay dashboards
4. Test end-to-end payment flow
5. Monitor logs for errors
6. Set up monitoring alerts (optional: DataDog, New Relic, etc.)
