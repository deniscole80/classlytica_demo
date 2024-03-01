const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { notificationModel } = require("./notification.model");
const Utils = require("../../configs/utils");
const Mailer = require("../../libs/emails/mailchimp");
const { helpers } = require("../../libs/utilities/helpers");
const fs = require("fs");

const { successful, redirection, client_error, server_error } =
  Utils.status_codes;

exports.notificationController = {
  getLikeNotifications: (req, res) => {
    console.log(req.body);
    notificationModel.getLikeNotifications(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.accepted).send(resp);
      },
      (error) => {
        res.status(client_error.not_acceptable).send({ message: error });
      }
    );
  },

  getShareNotifications: (req, res) => {
    console.log(req.body);
    notificationModel.getShareNotifications(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.accepted).send(resp);
      },
      (error) => {
        res.status(client_error.not_acceptable).send({ message: error });
      }
    );
  },

  getFollowNotifications: (req, res) => {
    console.log(req.body);
    notificationModel.getFollowNotifications(req.body).then(
      (resp) => {
        // console.log(resp);
        res.status(successful.accepted).send(resp);
      },
      (error) => {
        res.status(client_error.not_acceptable).send({ message: error });
      }
    );
  },

  getCommentNotifications: (req, res) => {
    console.log(req.body);
    notificationModel.getCommentNotifications(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.accepted).send(resp);
      },
      (error) => {
        res.status(client_error.not_acceptable).send({ message: error });
      }
    );
  },

  employmentRequestNotifications: (req, res) => {
    console.log(req.body);
    notificationModel.employmentRequestNotifications(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.accepted).send(resp);
      },
      (error) => {
        res.status(client_error.not_acceptable).send({ message: error });
      }
    );
  },
};
