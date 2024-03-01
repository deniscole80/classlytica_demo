const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { userModel } = require("./user.model");
const Utils = require("../../configs/utils");
const Mailer = require("../../libs/emails/mailchimp");
const { helpers } = require("../../libs/utilities/helpers");
const fs = require("fs");

const { successful, redirection, client_error, server_error } =
  Utils.status_codes;

exports.userController = {
  followUser: (req, res) => {
    console.log(req.body);
    userModel.followUser(req.body).then(
      (resp) => {
        console.log(resp);
        if (resp != null) {
          res.status(successful.created).send(resp);
        } else {
          res
            .status(server_error.internal_server_error)
            .send({ message: "Failed" });
        }
      },
      (err) => {
        console.log("Fetch error", err);
        res.status(client_error.not_acceptable).send({ message: "Failed" });
      }
    );
  },

  getFollowSuggestions: (req, res) => {
    console.log(req.body);
    userModel.getFollowSuggestions(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.accepted).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ message: error });
      }
    );
  },

  getFollowers: (req, res) => {
    console.log(req.body);
    userModel.getFollowers(req.body).then(
      (resp) => {
        // console.log(resp);
        res.status(successful.accepted).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ message: error });
      }
    );
  },

  getFollowings: (req, res) => {
    console.log(req.body);
    userModel.getFollowings(req.body).then(
      (resp) => {
        // console.log(resp);
        res.status(successful.accepted).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ message: error });
      }
    );
  },

  getProfileComplete: (req, res) => {
    console.log(req.body);
    let percent = 0;
    userModel.getProfileComplete(req.body).then(
      (resp) => {
        console.log(resp);
        resp["user"]["profile_img"] && (percent += 25);
        resp["user"]["cover_img"] && (percent += 25);
        resp["user"]["bio"] && (percent += 25);
        resp["interests"] && (percent += 25);
        res.status(successful.ok).send({ percent });
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error, percent });
      }
    );
  },

  viewProfile: (req, res) => {
    console.log(req.body);
    userModel.viewProfile(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.ok).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error, percent });
      }
    );
  },

  createCv: (req, res) => {
    console.log(req.body);
    userModel.createCv(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.created).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send(error);
      }
    );
  },

  viewCv: (req, res) => {
    console.log(req.body);
    userModel.viewCv(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.ok).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error, percent });
      }
    );
  },

  fetchUserInterests: (req, res) => {
    console.log(req.body);
    userModel.fetchUserInterests(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.ok).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error, percent });
      }
    );
  },

  completeUserProfile: (req, res) => {
    console.log(req.body);
    userModel.completeUserProfile(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.created).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send(error);
      }
    );
  },

  editProfile: (req, res) => {
    console.log(req.body);
    userModel.editProfile(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.created).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send(error);
      }
    );
  },

  searchUser: (req, res) => {
    console.log(req.body);

    userModel.searchUser(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.ok).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },

  fetchMyKids: (req, res) => {
    console.log(req.body);

    userModel.fetchMyKids(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.ok).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },

  fetchParentKids: (req, res) => {
    console.log(req.body);

    userModel.fetchParentKids(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.ok).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },
};
