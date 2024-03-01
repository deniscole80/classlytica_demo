const { commentController } = require("./comment.controller");
const { getRoute } = require("../../libs/middlewares/get_route");
const { jwtAuthentication } = require("../../libs/middlewares/jwt_auth");
require("express-group-routes");

exports.commentRoutes = function (app) {
  app.group("/api/v1/comment/", (router) => {
    router.post(
      "/create-comment",
      [getRoute, jwtAuthentication],
      commentController.createComment
    );
    router.post(
      "/fetch-comments",
      [getRoute, jwtAuthentication],
      commentController.fetchComments
    );
  });
};
