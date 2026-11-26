# Warisan vs Arisan — Official Marketing & Beta Leads Website (`warisanarisan.com`)

Static, zero-build marketing, interactive mini-merge & architectural showcase, and iOS TestFlight / Android Closed Beta lead-capture website for **Warisan vs Arisan: Merge Kafe** (`id.griyacempaka.warisanarisan`) by **KAS Studio**.

Serves **`https://warisanarisan.com`** (via GitHub Pages `kas-studio/warisanarisan-site` and Vercel) while preserving `/privacy.html`, `/sitemap.xml`, `/robots.txt`, and `/app-ads.txt`.

## Quick Store & Leads Configuration
Edit `SITE_CONFIG` at the top of `website/app.js`:
- `iosUrl`: paste your public Apple TestFlight invite or live App Store URL when ready (while empty, clicking `App Store (iOS)` opens the in-page Apple ID waitlist modal).
- `androidUrl`: paste your Google Play Closed Beta opt-in or live Play Store URL when ready (while empty, clicking `Google Play` opens the in-page Gmail waitlist modal).
- `supabaseUrl` & `supabaseAnonKey`: optional Supabase project keys (writes directly into `public.warisan_marketing_leads` from `supabase/migrations/20261122_marketing_leads.sql`).
- `leadsWebhookUrl`: Google Sheets Apps Script Web App URL (compatible with `scripts/google-sheets-leads-webhook.gs`).
- `formSubmitToken`: privacy-shielded FormSubmit inbox delivery token.

## Local Preview
```bash
npx serve website
```

## Deploy
- **GitHub Pages (`warisanarisan.com`):** Run `npm run deploy:website` (`bash scripts/deploy-website.sh`).
- **Vercel (`warisan-arisan.vercel.app` / `warisanarisan.com`):** Root `vercel.json` points `outputDirectory` directly to `website` (`npx vercel --prod`).
