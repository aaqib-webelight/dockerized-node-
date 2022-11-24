const express = require("express");
const {updateRatelimiter, rateLimiterMiddleware} = require("./app");

const app = express();
app.use(rateLimiterMiddleware);

app.get("/test", function (req, res) {
    // console.log(req)
  res.send("Viewing user " + req);
});

app.get("/update/:points", function (req, res) {
    // console.log(req)
 updateRatelimiter(req.params.points)
  res.send("Updated points " + req.params.points);
});

app.listen(4000);
