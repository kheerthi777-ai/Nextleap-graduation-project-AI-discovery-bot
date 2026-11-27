# n8n workflows

Exported n8n workflow JSON files live here, so the repo keeps a version history of the engine.

## How to export

1. In n8n, open the workflow and choose **⋯ → Download**.
2. Save it here as `NN-short-name.json`, e.g. `01-collect-play-store.json`.
3. Check the file contains **no API keys or credentials** before committing. n8n leaves credential values out of exports, but check any hard-coded headers or URLs anyway.

## How to import

In n8n: **Workflows → Import from file**, then reconnect your own credentials.

## Planned workflows

| File | What it does |
|---|---|
| `01-collect-*.json` | One collector per source (Play Store, App Store, Reddit, YouTube, …) |
| `02-clean-and-tag.json` | Deduplicate, then tag category, city, household type, acquisition channel and journey stage with the LLM |
| `03-themes.json` | Group tagged items into themes and count them |
| `04-score-opportunities.json` | Quantify, compare and adjust for bias |
| `05-ask-the-engine.json` | Public form or webhook: the testable link for mentors |
