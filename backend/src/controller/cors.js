const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN;
const ALLOW_METHODS = process.env.ALLOW_METHODS;
const ALLOW_HEADERS = process.env.ALLOW_HEADERS;

module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', ALLOW_ORIGIN);
    res.header('Access-Control-Allow-Methods', ALLOW_METHODS);
    res.header('Access-Control-Allow-Headers', ALLOW_HEADERS);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Vary', 'Origin');
    next();
}
