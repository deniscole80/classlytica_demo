const { userController } = require("./user.controller");
const { getRoute } = require("../../libs/middlewares/get_route");
const { jwtAuthentication } = require("../../libs/middlewares/jwt_auth");
require("express-group-routes");

exports.userRoutes = function (app) {
  app.group("/api/v1/user/", (router) => {
    router.post(
      "/follow-suggestions",
      [getRoute, jwtAuthentication],
      userController.getFollowSuggestions
    );
    router.post(
      "/follow-user",
      [getRoute, jwtAuthentication],
      userController.followUser
    );
    router.post(
      "/profile-complete",
      [getRoute, jwtAuthentication],
      userController.getProfileComplete
    );
    router.post(
      "/my-followers",
      [getRoute, jwtAuthentication],
      userController.getFollowers
    );
    router.post(
      "/my-followings",
      [getRoute, jwtAuthentication],
      userController.getFollowings
    );
    router.post(
      "/view-profile",
      [getRoute, jwtAuthentication],
      userController.viewProfile
    );
    router.post(
      "/create-cv",
      [getRoute, jwtAuthentication],
      userController.createCv
    );
    router.post(
      "/view-cv",
      [getRoute, jwtAuthentication],
      userController.viewCv
    );
    router.post(
      "/fetch-user-interests",
      [getRoute, jwtAuthentication],
      userController.fetchUserInterests
    );
    router.post(
      "/complete-user-profile",
      [getRoute, jwtAuthentication],
      userController.completeUserProfile
    );
    router.post(
      "/edit-profile",
      [getRoute, jwtAuthentication],
      userController.editProfile
    );
    router.post(
      "/search-user",
      [getRoute, jwtAuthentication],
      userController.searchUser
    );
    router.post(
      "/fetch-my-kids",
      [getRoute, jwtAuthentication],
      userController.fetchMyKids
    );
    router.post(
      "/fetch-parent-kids",
      [getRoute, jwtAuthentication],
      userController.fetchParentKids
    );
  });
};
