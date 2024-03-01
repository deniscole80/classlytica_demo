const {classlyticaController} = require('./classlytica.controller');
const {getRoute} = require('../../libs/middlewares/get_route');
const {jwtAuthentication} = require('../../libs/middlewares/jwt_auth');
require('express-group-routes');

exports.classlyticaRoutes = function (app) {
    app.group("/api/v1/classlytica/", (router) => {
        router.post("/create-interest", [getRoute], classlyticaController.createInterest);
        router.post("/create-user-type", [getRoute], classlyticaController.createUserType);
    });
};