# The Campus Insight Board

Next.js app ready for Vercel. Includes a landing with search, university profiles, rules page, and a mock API (`/api/universities`). You can later swap the mock API for Postgres (Supabase/Neon) with Prisma + NextAuth.

---

## 1) Project Structure
```
app/
  layout.tsx
  page.tsx                # Landing (client component)
pages/
  api/
    universities.ts       # Mock API
  rules.tsx               # Rules page
  university/[id]/index.tsx # University profile page
components/ui/            # Minimal UI (Button, Card, etc.)
public/logo-campus.png
prisma/
  schema.prisma (optional when you enable DB)
styles/globals.css
vercel.json
package.json
```

---

## 2) Local Development
```bash
npm i
npm run dev
```
Open http://localhost:3000

### Endpoints
- `/` – landing + search (fetches `/api/universities`).
- `/rules` – rules & verification methodology.
- `/university/[id]` – profile view.
- `/api/universities` – returns mock data list (filtered by `?q=`).

---

## 3) Environment Variables (when you enable DB/Auth)
Create `.env.local` in project root:
```
NEXTAUTH_SECRET=replace_with_strong_secret
DATABASE_URL=postgresql://user:password@host:5432/dbname
NEXT_PUBLIC_SITE_URL=
# Optional Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
# Optional Email provider
EMAIL_SERVER=
EMAIL_FROM=
```
Generate a secret:
```bash
openssl rand -base64 32
```

> **Note**: The current ZIP uses a **mock API** so it deploys without DB. When you’re ready, wire up Prisma + Postgres and replace the mock handler.

---

## 4) Enable Postgres (Supabase/Neon) + Prisma (Optional)
1. Create a Postgres database in **Supabase** or **Neon**.
2. Put the connection string in `DATABASE_URL` (in `.env.local` and in Vercel → Project → Settings → Environment Variables for **Production** and **Preview**).
3. Install Prisma (already in package.json) and run migrations locally pointing to the remote DB:
```bash
npx prisma migrate dev --name init
node prisma/seed.mjs  # if you add the seed
```
4. Replace `pages/api/universities.ts` with a DB-backed handler (Prisma client), or create new API routes.

---

## 5) Deploy to Vercel
### A) From GitHub (recommended)
1. Create a repo and push the code:
```bash
git init
git add -A
git commit -m "init: the-campus-insight-board"
git branch -M main
git remote add origin https://github.com/<you>/The_campus_insight_board.git
git push -u origin main
```
2. Go to https://vercel.com/new → **Import Git Repository** → select your repo.
3. Framework: **Next.js** (auto).
4. Environment Variables (if enabling DB/Auth): add those from section 3.
5. Click **Deploy**.

### B) Upload the ZIP (quick test)
1. Go to https://vercel.com/new
2. Click **Upload** (or drag-and-drop the ZIP).
3. Framework: **Next.js** → **Deploy**.

> After deploy, you get a Preview URL; promote to Production when ready.

---

## 6) Common Tasks
### Change site name & logo
- Edit `app/layout.tsx` (metadata) and `app/page.tsx` header text.
- Replace `public/logo-campus.png` with your real logo (same filename).

### Add real data to Universities
- Swap the mock handler in `pages/api/universities.ts` for a DB query.
- Update the profile page to fetch real fields (employability, scholarships, housingScore).

### Add Authentication (NextAuth)
- Install and configure providers (Google/Email) and Prisma adapter.
- Ensure you set `NEXTAUTH_SECRET` and provider secrets in Vercel.

---

## 7) Troubleshooting
- **Multiple default exports**: In Next.js, each file must export **only one** `default`. Do not concatenate pages or API routes in one file.
- **500 in `/api/universities`**: DB not set up/migrations missing. Use mock first, or run `prisma migrate deploy` against the production DB.
- **Auth failing**: Missing `NEXTAUTH_SECRET` or provider credentials.
- **404 on `/university/[id]`**: Ensure that ID exists in your dataset or DB.

---

## 8) Roadmap (optional)
- Replace mock API with Prisma + Postgres (Supabase/Neon).
- Add roles (student / university / moderator) and guard routes.
- Admin dashboard to moderate reviews.
- ISR for university profiles.

---

## 9) Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "postinstall": "prisma generate"
  }
}
```

---

## 10) License
MIT (or your preferred license).

