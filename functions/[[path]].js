// files.glocal-commune.com へのアクセスを R2 バケット(FILES)から配信する。
// それ以外のホスト（www など）は通常どおり静的サイトを返す（next）。
// 検索エンジン非掲載のため X-Robots-Tag: noindex を付与。
export async function onRequest(context) {
  const { request, env, next } = context;
  try {
    const url = new URL(request.url);
    const FILES_HOST = 'files.glocal-commune.com';

    // ファイル配信ドメイン以外は通常のサイト配信に委譲
    if (url.hostname !== FILES_HOST) return next();

    // クローラー対策（このドメイン全体を非掲載に）
    if (url.pathname === '/robots.txt') {
      return new Response('User-agent: *\nDisallow: /\n', {
        headers: { 'content-type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' },
      });
    }

    if (!env.FILES) {
      return new Response('File storage is not configured.', { status: 503 });
    }

    const key = decodeURIComponent(url.pathname.replace(/^\/+/, ''));
    if (!key) {
      return new Response('Not found', { status: 404, headers: { 'X-Robots-Tag': 'noindex' } });
    }

    const object = await env.FILES.get(key);
    if (!object || !object.body) {
      return new Response('Not found', { status: 404, headers: { 'X-Robots-Tag': 'noindex' } });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('X-Robots-Tag', 'noindex, nofollow');
    headers.set('Cache-Control', 'public, max-age=3600');
    // ブラウザでの表示優先（PDF/画像はインライン表示、必要なら下行をattachmentに）
    // headers.set('Content-Disposition', 'attachment');
    return new Response(object.body, { headers });
  } catch (e) {
    // 万一のエラーでも本体サイトに影響させない
    return next();
  }
}
