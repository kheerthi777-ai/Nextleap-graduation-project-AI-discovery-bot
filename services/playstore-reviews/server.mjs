// Returns public Google Play reviews as JSON so n8n can fetch them with a plain HTTP Request node.
//   GET /health
//   GET /reviews?appId=com.urbanclap.urbanclap&country=in&lang=en&count=300&sort=newest
// Only public review fields are returned. Reviewer names and avatars are dropped on purpose.
import http from 'node:http';
import gplay from 'google-play-scraper';

const PORT = Number(process.env.PORT || 3000);
const MAX_COUNT = 2000;
const PAGE_SIZE = 150;
const SORTS = { newest: gplay.sort.NEWEST, relevant: gplay.sort.HELPFULNESS, rating: gplay.sort.RATING };

async function fetchReviews({ appId, country, lang, count, sort }) {
  const out = [];
  let token;
  do {
    const page = await gplay.reviews({
      appId, country, lang, sort, num: PAGE_SIZE, paginate: true, nextPaginationToken: token,
    });
    out.push(...page.data);
    token = page.nextPaginationToken;
  } while (token && out.length < count);

  return out.slice(0, count).map((r) => ({
    id: r.id,
    text: r.text ?? '',
    score: r.score,
    date: r.date ? new Date(r.date).toISOString() : null,
    thumbsUp: r.thumbsUp ?? 0,
    appVersion: r.version ?? null,
    hasDeveloperReply: Boolean(r.replyText),
  }));
}

function send(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json' });
  res.end(JSON.stringify(body));
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname === '/health') return send(res, 200, { ok: true });
  if (url.pathname !== '/reviews') return send(res, 404, { error: 'not found' });

  const appId = url.searchParams.get('appId');
  if (!appId) return send(res, 400, { error: 'appId is required' });
  const count = Math.min(Math.max(Number(url.searchParams.get('count')) || 200, 1), MAX_COUNT);
  const sortKey = url.searchParams.get('sort') || 'newest';
  const params = {
    appId,
    country: url.searchParams.get('country') || 'in',
    lang: url.searchParams.get('lang') || 'en',
    count,
    sort: SORTS[sortKey] ?? SORTS.newest,
  };

  try {
    const reviews = await fetchReviews(params);
    send(res, 200, { appId, country: params.country, lang: params.lang, sort: sortKey, count: reviews.length, reviews });
  } catch (err) {
    console.error(err);
    send(res, 502, { error: 'could not fetch reviews', detail: String(err?.message || err) });
  }
}).listen(PORT, () => console.log(`playstore-reviews listening on ${PORT}`));
