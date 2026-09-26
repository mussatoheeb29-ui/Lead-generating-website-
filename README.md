# Lead Agent MVP

A runnable Origami-style prospecting MVP: natural-language campaign prompt -> lead discovery -> qualification -> AI-personalized outreach -> human review -> manual email send.

## Run locally

Requirements: Node.js 18.17+.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## AI personalization

Set `OPENAI_API_KEY`. If it is absent, the app uses a safe deterministic draft so the UI still works.

## Live lead discovery

Set `SEARCH_API_URL` to a provider or your own discovery service. It receives:

```json
{"prompt":"Find US jewelry brands..."}
```

Return either:

```json
{"leads":[{"company":"...","website":"...","contactName":"...","contactRole":"...","email":"...","signal":"...","fitReason":"...","source":"..."}]}
```

or a plain array of lead objects.

This keeps the MVP provider-neutral. You can later add Serper/Tavily/Google search, a company database, email verification, or a CRM adapter without changing the UI.

## Email

Configure SMTP in `.env.local`. The app only sends when you press **Send** for a reviewed lead. It does not automatically blast newly discovered contacts.

For Gmail, use a Google App Password rather than your normal account password when required by your account security settings.

## Recommended production upgrades

- Persistent PostgreSQL/Supabase database
- User authentication and campaign history
- Search/enrichment adapters
- Email verification and suppression/unsubscribe handling
- Rate limits and provider quotas
- Duplicate detection
- Background jobs
- CRM integrations
- Audit log
- Consent/compliance controls for outbound campaigns
