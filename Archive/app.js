const redis = require('redis');
const {RateLimiterMemcache} = require('rate-limiter-flexible');

const Memcached = require('memcached');
const memcached = new Memcached('127.0.0.1:11211');

const rateLimiter = new RateLimiterMemcache({
  storeClient: memcached,
  points: 1, // 10 requests
  duration: 1, // per 1 second by IP
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume(req.ip)
    .then((res) => {
      console.log("consumer", res, req.ip)
      next();
    })
    .catch((e) => {
      console.log("error--------------------------------------")
      res.status(429).send('Too Many Requests');
    });
};

const updateRatelimiter = (points) => {
  rateLimiter.points = points;
};

module.exports = {rateLimiterMiddleware, updateRatelimiter};
