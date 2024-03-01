const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { commentModel } = require("./comment.model");
const Utils = require("../../configs/utils");
const Mailer = require("../../libs/emails/mailchimp");
const { helpers } = require("../../libs/utilities/helpers");
const fs = require("fs");

const { successful, redirection, client_error, server_error } =
  Utils.status_codes;

exports.commentController = {
  createComment: async (req, res) => {
    console.log(req.body);

    commentModel.createComment(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.created).send(resp);
      },
      (error) => {
        console.log(error);
        res.status(server_error.internal_server_error).send({ message: error });
      }
    );
  },

  fetchComments: async (req, res) => {
    console.log(req.body);

    commentModel.fetchComments(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.accepted).send(resp);
      },
      (error) => {
        console.log(error);
        res.status(server_error.internal_server_error).send({ message: error });
      }
    );
  },
};
