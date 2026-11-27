# AI Discovery Engine: Urban Company Repeat Bookings

NextLeap Product Manager Fellowship graduation project (Nov 2026), **Part 1: AI-Powered Discovery Engine**.

📘 **Main docs and full brief: [NextLeap Grad Project (Notion)](https://app.notion.com/p/422ac0e1f7f280998ed7f0449ebfecce)**

⏰ **Submission deadline: 13 Dec 2026, 3:59 PM IST**

## The problem space

Role: PM on Urban Company's Consumer Growth team.

**Business metric:** the share of customers who complete another booking within 90 days of a completed booking.

- **Anchor booking:** a customer's first completed booking in a chosen month, in a core category. InstaHelp is excluded.
- **Counts as a return:** any later completed booking, in any category, within 90 days.
- **Does not count:** redos, warranty claims, or bookings that end in a refund.

The underlying user problem is **not given**. This engine exists to discover it from public customer feedback, at scale.

## What the engine does

It gathers public conversations about booking home services in India, then finds, **quantifies** and **compares** opportunity areas that could move the metric. Summaries and sentiment scores alone are not enough.

### Sources (public and permitted only)

- App Store and Play Store reviews
- Trustpilot and consumer complaint forums
- Reddit (Indian city and household communities)
- Social media conversations about home services
- YouTube comments on home-service and cleaning videos
- Urban Company shareholder letters and earnings-call transcripts
- Other public conversations about booking home services in India

> ❌ Never scrape logged-in Urban Company pages or the app.

### Questions it must help answer

1. What do customers expect once a booking is complete?
2. How do they decide that a home service is needed, and when?
3. Who or what do they turn to when they need the same service again, or a different one?
4. How do customers explain, in their own words, why they did or did not book again?
5. What do they do outside the app (local providers, neighbours, family, WhatsApp groups)?
6. What separates customers who return from those who don't, in their own accounts?
7. How do these patterns differ by service category, city, household type, and how the customer first found Urban Company?
8. What unmet needs come up again and again?

### Biases it must account for

- **Negativity bias:** public posts over-represent people who had bad experiences.
- **Silent churn:** customers who simply never came back leave no trace.

## Pipeline (planned)

```
collect  →  clean / dedupe  →  tag (category, city, household, acquisition channel, stage)
        →  theme extraction  →  quantify & compare opportunities  →  bias adjustment
        →  validate against hand-labelled golden set  →  insights report
```

## Required outputs

- **[Link] Testable workflow:** a link where the engine can be tried, plus a 1-slide explanation for the deck
- **[Link] AI Evidence Log** (one doc, view access for anyone with the link):
  - sources analysed, and how much from each
  - a **golden set of about 20 hand-labelled items**: how often the engine agreed with the hand labels, and where it failed
  - **2–3 places** where AI output was rejected or corrected, and why

## Repo layout

```
.
├── src/       # engine code (collectors, analysis, reporting)
├── tests/     # automated tests
├── docs/      # technical notes (the main docs are in Notion)
└── .env.example
```

## Getting started

1. Clone the repo
2. Copy `.env.example` to `.env` and fill in your keys (never commit `.env`)
3. Setup steps will be added once the stack is chosen

## Status

🚧 Repo set up. Stack and first collector still to be chosen.
