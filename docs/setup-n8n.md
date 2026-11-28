# Setup: self-hosted n8n + Play Store collector

About 15 minutes. You need [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker + Compose on Linux).

## 1. Start n8n and the reviews service

```bash
git clone https://github.com/kheerthi777-ai/Nextleap-graduation-project-AI-discovery-bot.git
cd Nextleap-graduation-project-AI-discovery-bot
docker compose up -d --build
```

Open <http://localhost:5678> and create your n8n owner account.

Check the reviews service is up:

```bash
docker compose exec n8n wget -qO- http://playstore-reviews:3000/health
# → {"ok":true}
```

## 2. Get a free Gemini API key

1. Go to [Google AI Studio](https://aistudio.google.com/) → **Get API key** → create a key.
2. In AI Studio, check which models your free key can use and their daily limits. Note one **Flash** model name (e.g. `gemini-3.8-flash`).

> Free-tier prompts may be used by Google to improve its models. That's fine for public reviews. Never send interview notes or personal data through the free tier.

## 3. Add the key to n8n

**Credentials → Add credential → Header Auth**

| Field | Value |
|---|---|
| Name | `x-goog-api-key` |
| Value | your Gemini API key |

Save it as **Gemini API key**.

## 4. Import the workflow

1. **Workflows → Import from file** → `workflows/01-playstore-reviews-gemini.json`
2. Open the **Tag with Gemini** node → under Credential choose **Gemini API key**.
3. Open the **Settings** node and check:
   - `geminiModel`: a model name your key can use (from step 2)
   - `count`: start with **50** for a test run, then raise it (max 2000)
4. Click **Execute workflow**.

## 5. Get the results

Two CSV files appear in this repo's `data/` folder (git ignores them):

| File | What's in it |
|---|---|
| `playstore_reviews_tagged_<date>.csv` | Every review, with category, journey stage, repeat signal, alternative used, themes and an evidence quote |
| `playstore_themes_<date>.csv` | Themes ranked by mentions, with share of reviews, share of 1–2★ reviews and an example quote |

Next steps in Notion:
- Put the review count into **Data Sources → Google Play Store reviews → Items collected**.
- Copy the top themes into **Themes & Opportunities**.
- Pick about 20 reviews from the tagged CSV for the **Golden Set**. Label them yourself *before* looking at Gemini's labels.

## Free-tier limits

The workflow sends **25 reviews per request** and **one request every 15 seconds**, so 300 reviews ≈ 12 requests ≈ 3 minutes. If you hit a daily quota error, rows show it in the `tag_error` column. Wait for the quota to reset and re-run, or lower `count`.

## Troubleshooting

| Problem | Fix |
|---|---|
| `Fetch Play Store reviews` fails | `docker compose logs playstore-reviews`. Google sometimes changes its pages; update the package with `docker compose build --no-cache playstore-reviews`. |
| Gemini returns 404 | The model name isn't available to your key. Change `geminiModel` in Settings. |
| Gemini returns 429 | Free quota hit. Wait, or lower `count` / raise the 15 s interval in the Tag with Gemini node (Options → Batching). |
| Can't log in at localhost | Make sure `N8N_SECURE_COOKIE=false` is in `docker-compose.yml` (it is by default). |
| `Save … CSV` fails with an access error | Files can only be written under `/data`. Don't change the path prefix. |
