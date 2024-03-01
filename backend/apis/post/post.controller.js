const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { postModel } = require("./post.model");
const Utils = require("../../configs/utils");
const Mailer = require("../../libs/emails/mailchimp");
const { helpers } = require("../../libs/utilities/helpers");
const fs = require("fs");

const { successful, redirection, client_error, server_error } =
  Utils.status_codes;

exports.postController = {
  createPost: async (req, res) => {
    // delete req.body.type;
    console.log(req.body);

    postModel.createPost(req.body).then(
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

  fetchFeeds: (req, res) => {
    console.log(req.body);

    postModel.fetchFeeds(req.body).then(
      (resp) => {
        if (resp) {
          console.log(resp);
          res.status(successful.ok).send(resp);
        } else {
          res
            .status(server_error.internal_server_error)
            .send({ message: "Nothing found" });
        }
      },
      (err) => {
        console.log("Actual error", err);
        res.status(server_error.internal_server_error).send({ message: error });
      }
    );
  },

  fetchMyFeeds: (req, res) => {
    console.log(req.body);

    postModel.fetchMyFeeds(req.body).then(
      (resp) => {
        if (resp) {
          console.log(resp);
          res.status(successful.ok).send(resp);
        } else {
          res
            .status(server_error.internal_server_error)
            .send({ message: "Nothing found" });
        }
      },
      (err) => {
        console.log("Actual error", err);
        res.status(server_error.internal_server_error).send({ message: error });
      }
    );
  },

  likePost: async (req, res) => {
    console.log(req.body);

    postModel.likePost(req.body).then(
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

  sharePost: async (req, res) => {
    console.log(req.body);

    postModel.sharePost(req.body).then(
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
};
