const { authController } = require("./auth.controller");
const { getRoute } = require("../../libs/middlewares/get_route");
const { uploadImage } = require("../../libs/middlewares/upload_image");
const { jwtAuthentication } = require("../../libs/middlewares/jwt_auth");
require("express-group-routes");

exports.authRoutes = function (app) {
  app.group("/api/v1/auth/", (router) => {
    router.post("/verify-email", [getRoute], authController.verifyEmail);
    router.post("/register", [getRoute], authController.register);
    router.post("/verify-code", [getRoute], authController.verifyCode);
    router.post("/login", [getRoute], authController.login);
    router.post("/reset-link", [getRoute], authController.resetLink);
    router.post(
      "/verify-reset-link",
      [getRoute, jwtAuthentication],
      authController.verifyResetLink
    );
    router.post(
      "/set-password",
      [getRoute, jwtAuthentication],
      authController.setPassword
    );
    router.post(
      "/set-pic",
      [getRoute, jwtAuthentication, uploadImage],
      authController.setPicture
    );
    router.post(
      "/fetch-all-interests",
      [getRoute, jwtAuthentication],
      authController.fetchAllInterests
    );
    router.post(
      "/set-user-interests",
      [getRoute, jwtAuthentication],
      authController.setUserInterests
    );
    router.post(
      "/finish-onboarding",
      [getRoute, jwtAuthentication],
      authController.finishOnboarding
    );
  });
};
