const { notificationController } = require("./notification.controller");
const { getRoute } = require("../../libs/middlewares/get_route");
const { jwtAuthentication } = require("../../libs/middlewares/jwt_auth");
require("express-group-routes");

exports.notificationRoutes = function (app) {
  app.group("/api/v1/notification/", (router) => {
    router.post(
      "/get-like-notifications",
      [getRoute, jwtAuthentication],
      notificationController.getLikeNotifications
    );
    router.post(
      "/get-share-notifications",
      [getRoute, jwtAuthentication],
      notificationController.getShareNotifications
    );
    router.post(
      "/get-follow-notifications",
      [getRoute, jwtAuthentication],
      notificationController.getFollowNotifications
    );
    router.post(
      "/get-comment-notifications",
      [getRoute, jwtAuthentication],
      notificationController.getCommentNotifications
    );
    router.post(
      "/employment-request-notifications",
      [getRoute, jwtAuthentication],
      notificationController.employmentRequestNotifications
    );
  });
};
