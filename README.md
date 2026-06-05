# Cyber Career Pathway Funnel

Marketing automation MVP for a cybersecurity career-switch funnel. It includes a landing page, 10-question pathway quiz, lead capture, personalized result page, email/SMS-ready automation, CRM-style admin dashboard, webhook endpoints, and PostgreSQL/Supabase schema.

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000` for local development.

The MVP uses a local JSON store at `.data/store.json` so the funnel works immediately. For PostgreSQL/Supabase, set `DATABASE_URL`, run Prisma migration, and use `prisma/schema.prisma` plus `prisma/migration.sql` as the database reference.

## Masterclass Page

The free webinar page is available at:

```text
/masterclass
```

It promotes the June 28, 2026 masterclass at 10:00 AM Mountain Time. The session is a 1-hour program exploration and Q&A with a bonus at the end. `MASTERCLASS_LINK` defaults to `/masterclass`, so result-page CTAs route there automatically.

## Environment Variables

Required for admin:

- `ADMIN_LOGIN`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

Recommended funnel settings:

- `APP_URL`
- `BOOKING_LINK`
- `MASTERCLASS_LINK`
- `ADMIN_NOTIFICATION_EMAIL`
- `DEFAULT_SENDER_NAME`
- `PROGRAM_COHORT_NAME`

Email:

- `EMAIL_PROVIDER=console` for local logging
- `EMAIL_PROVIDER=resend` and `RESEND_API_KEY` for Resend
- `EMAIL_FROM`

SMS:

- `SMS_ENABLED=false` by default
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_FROM_NUMBER`

Webhooks:

- `WEBHOOK_SHARED_SECRET` for GoHighLevel/Zapier/Make-style inbound webhook protection

## Database Setup

For Supabase or PostgreSQL:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

The requested tables are modeled in `prisma/schema.prisma`:

- `leads`
- `quiz_responses`
- `pipeline_stages`
- `email_logs`
- `sms_logs`
- `admin_users`
- `automation_settings`

The SQL reference is in `prisma/migration.sql`.

## Admin Login

Local admin login:

```text
http://localhost:3000/admin/login
```

Deployed admin dashboard:

```text
https://dr-cyber.onrender.com/admin
```

Default credentials if no env is set:

- Login ID: `saginin`
- Password: `638425@Af`

Change these before deployment.

## Test The Funnel

1. Open the landing page.
2. Click `Take the Free Cyber Career Quiz`.
3. Answer all 10 questions.
4. Submit lead details and check the consent box.
5. Confirm redirect to `/result?id=...`.
6. Visit `/admin/login`, sign in, and open `/admin/leads`.
7. Open the lead detail page to verify quiz responses, pathway scores, email logs, SMS logs, notes, and pipeline status.

Email runs in console mode unless a provider is configured. SMS is skipped unless `SMS_ENABLED=true` and Twilio credentials are present.

## Email Provider

Resend is supported by the placeholder provider:

```env
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_...
EMAIL_FROM=Cyber Career Pathway Team <hello@yourdomain.com>
```

SendGrid/SMTP can be added by extending `lib/services/email.ts`; the route and logging architecture are already provider-neutral.

## Twilio SMS

Set:

```env
SMS_ENABLED=true
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_FROM_NUMBER=+15555550123
```

If credentials are missing, submissions continue and the SMS log records `missing-credentials`.

## Calendly

Set:

```env
BOOKING_LINK=https://calendly.com/saginin/30min
```

Point Calendly webhooks to:

```text
POST /api/webhooks/calendly
```

The webhook looks up the invitee email and moves the lead to `Call Booked`.

## GoHighLevel, Zapier, Make.com

Use:

```text
POST /api/webhooks/ghl
```

Send `x-webhook-secret` when `WEBHOOK_SHARED_SECRET` is configured. This endpoint currently logs receipt and is ready to be extended for contact sync, opportunity updates, or tags.

## Deploy

1. Push to GitHub.
2. Import into Vercel.
3. Add all environment variables.
4. Create a Supabase/PostgreSQL database and set `DATABASE_URL`.
5. Run Prisma migration/seed from a local machine or deployment job.
6. Configure your email domain and provider.
7. Add Calendly and optional Twilio credentials.

## Editable Funnel Config

- Quiz questions and scoring: `lib/config/quiz.ts`
- Pathway result content: `lib/config/pathways.ts`
- CRM stages: `lib/config/pipeline.ts`
- Email sequence timing: `lib/config/emailSequence.ts`

This keeps scoring and content out of UI components and makes the funnel easy to adjust.
