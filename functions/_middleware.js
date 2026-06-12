// Canonical host: apex eurpep.com. Any request to www.eurpep.com is
// permanently redirected to the apex, preserving path, query, and method
// (308 keeps POST as POST so API calls aren't downgraded). Runs before all
// other Pages Functions and static asset serving.

export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname.startsWith("www.")) {
    url.hostname = url.hostname.slice(4);
    return Response.redirect(url.toString(), 308);
  }
  return context.next();
}
