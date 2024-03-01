const { postController } = require("./post.controller");
const { getRoute } = require("../../libs/middlewares/get_route");
const { jwtAuthentication } = require("../../libs/middlewares/jwt_auth");
const {
  uploadMultipleImages,
} = require("../../libs/middlewares/upload_multiple_images");
const { uploadVideo } = require("../../libs/middlewares/upload_video");
require("express-group-routes");

exports.postRoutes = function (app) {
  app.group("/api/v1/post/", (router) => {
    router.post(
      "/create-text-post",
      [getRoute, jwtAuthentication],
      postController.createPost
    );
    router.post(
      "/create-post",
      [getRoute, jwtAuthentication, uploadMultipleImages],
      postController.createPost
    );
    router.post(
      "/create-video-post",
      [getRoute, jwtAuthentication, uploadVideo],
      postController.createPost
    );
    router.post(
      "/fetch-feeds",
      [getRoute, jwtAuthentication],
      postController.fetchFeeds
    );
    router.post(
      "/like-post",
      [getRoute, jwtAuthentication],
      postController.likePost
    );
    router.post(
      "/share-post",
      [getRoute, jwtAuthentication],
      postController.sharePost
    );
    router.post(
      "/fetch-my-feeds",
      [getRoute, jwtAuthentication],
      postController.fetchMyFeeds
    );
  });
};
