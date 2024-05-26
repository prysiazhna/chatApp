import etag from "etag";

const cacheMiddleware = (req, res, next) => {
    const cacheDuration = 60 * 60 * 24; // 1 day in seconds

    res.set('Cache-Control', `public, max-age=${cacheDuration}`);
    res.set('Expires', new Date(Date.now() + cacheDuration * 1000).toUTCString());
    res.set('Last-Modified', new Date().toUTCString());
    res.set('ETag', etag(JSON.stringify(req.body)));

    next();
};

export default cacheMiddleware;
