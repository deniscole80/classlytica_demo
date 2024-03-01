const express = require("express");
const bodyParser = require("body-parser");
const env = require("./configs/env");
const auth = require("./apis/auth/auth.route");
const classlytica = require("./apis/classlytica/classlytica.route");
const post = require("./apis/post/post.route");
const user = require("./apis/user/user.route");
const notification = require("./apis/notification/notification.route");
const comment = require("./apis/comment/comment.route");
const school = require("./apis/school/school.route");

const app = express();
// app.use(express.static('public'));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, X-Requested-With, Range, Content-Type"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  } else {
    return next();
  }
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

auth.authRoutes(app);
classlytica.classlyticaRoutes(app);
post.postRoutes(app);
user.userRoutes(app);
notification.notificationRoutes(app);
comment.commentRoutes(app);
school.schoolRoutes(app);

app.listen(env.port, function () {
  console.log("app listening at port %s", env.port);
});
