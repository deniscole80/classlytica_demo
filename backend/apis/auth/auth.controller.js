const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { authModel } = require("./auth.model");
const Utils = require("../../configs/utils");
const Mailer = require("../../libs/emails/mailchimp");
const { helpers } = require("../../libs/utilities/helpers");
const fs = require("fs");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const { successful, redirection, client_error, server_error } =
  Utils.status_codes;

exports.authController = {
  fetchAllInterests: (req, res) => {
    authModel.fetchAllInterests().then(
      (resp) => {
        console.log(resp);
        res.status(successful.accepted).send(resp);
      },
      (error) => {
        res.status(client_error.not_acceptable).send({ message: error });
      }
    );
  },

  finishOnboarding: (req, res) => {
    console.log(req.body);
    authModel.finishOnboarding(req.body).then(
      (resp) => {
        res.status(successful.created).send({ message: "finished" });
      },
      (error) => {
        res
          .status(client_error.not_acceptable)
          .send({ message: "Failed to finish", error });
      }
    );
  },

  login: async (req, res) => {
    console.log(req.body);

    authModel.login(req.body).then(
      (result) => {
        console.log(result);
        const { credential, user, user_interests, employer_id, role } = result;
        if (credential) {
          const password = result.credential.password;
          bcrypt.compare(req.body.password, password).then((resp) => {
            if (resp) {
              const rndNum = helpers.getRandomNumber();
              const token = jwt.sign({ user: rndNum }, Utils.tokenPassword, {
                expiresIn: "2h",
              });
              authModel
                .registerToken({ token, user_id: user.id })
                .then((resp) => {
                  res.status(successful.accepted).send({
                    message: "Logged in successfully",
                    token,
                    user,
                    interests: user_interests ? user_interests.interests : null,
                    employer_id: employer_id ? employer_id : null,
                    school_id: role ? role.school_id : null,
                    role,
                  });
                });
            } else {
              res.status(client_error.not_acceptable).send({
                message: "Incorrect login credentials",
                token: null,
                user: null,
                interests: null,
              });
            }
          });
        } else {
          res.status(client_error.not_acceptable).send({ message: result });
        }
      },
      (err) => {
        res.status(server_error.internal_server_error).send({ message: err });
      }
    );
  },

  verifyEmail: async (req, res) => {
    console.log(req.body);
    const v_code = helpers.getRandomNumber();
    req.body.v_code = v_code;
    const welcomeMessage = Utils.welcomeMessage(v_code);

    authModel.verifyEmail(req.body).then(
      async (resp) => {
        const sendMail = await Mailer.sendEmail(
          "info@classlytica.com",
          req.body.email,
          "Welcome to Classlytica",
          welcomeMessage
        );
        console.log(sendMail);

        res
          .status(successful.accepted)
          .send({ message: "Verification email sent" });
      },
      (error) => {
        // console.log(error);
        res
          .status(server_error.internal_server_error)
          .send({ message: error, user: null });
      }
    );
  },

  resetLink: async (req, res) => {
    console.log(req.body);
    const token = jwt.sign({ user: req.body.email }, Utils.tokenPassword, {
      expiresIn: "5m",
    });
    const resetLink =
      '<div style="display: flex; flex-direction: flex-column; justify-content: flex-start; align-items: center;">' +
      "<h1>Reset your password</h1>" +
      "<p>Click the link below to reset your password.</p>" +
      "<a href=" +
      Utils.resetBaseUrl +
      "?token=" +
      token +
      "&email=" +
      req.body.email +
      ">" +
      Utils.resetBaseUrl +
      "?token=" +
      token +
      "&email=" +
      req.body.email +
      "</a>";
    ("</div>");
    const sendMail = await Mailer.sendEmail(
      "info@classlytica.com",
      req.body.email,
      "Reset your password",
      resetLink
    );
    console.log(sendMail);
    if (sendMail[0].status == "sent") {
      authModel.storeLink({ email: req.body.email, token }).then(
        async (resp) => {
          res.status(successful.created).send({ message: "sent" });
        },
        (error) => {
          console.log(error);
          res
            .status(server_error.internal_server_error)
            .send({ message: error });
        }
      );
    } else {
      res
        .status(server_error.internal_server_error)
        .send({ message: "Email sending failed" });
    }
  },

  register: (req, res) => {
    console.log(req.body);
    authModel.register(req.body).then(
      (resp) => {
        if (resp == "successful") {
          res
            .status(successful.accepted)
            .send({ message: "Registration successfully" });
        } else {
          res.status(client_error.not_acceptable).send({ message: resp });
        }
      },
      (error) => {
        console.log(error);
        res.status(server_error.internal_server_error).send({ message: error });
      }
    );
  },

  setPicture: (req, res) => {
    let imageName = "";
    console.log(req.body);

    authModel.setPicture(req.body).then(
      (resp) => {
        console.log(resp);
        if (resp.message == "successful") {
          res.status(successful.accepted).send(resp);
        } else {
          res.status(client_error.not_acceptable).send(resp);
        }
      },
      (error) => {
        // console.log(error);
        res.status(server_error.internal_server_error).send({ message: error });
      }
    );
  },

  setPassword: (req, res) => {
    console.log(req.body);
    authModel.setPassword(req.body).then(
      (resp) => {
        console.log(resp);
        if (resp == "successful") {
          res.status(successful.accepted).send({ message: "Successful" });
        } else {
          res
            .status(server_error.internal_server_error)
            .send({ message: "Server failure" });
        }
      },
      (error) => {
        // console.log(error);
        res.status(client_error.forbidden).send({ message: error });
      }
    );
  },

  setUserInterests: (req, res) => {
    console.log(req.body);
    authModel.setUserInterests(req.body).then(
      (resp) => {
        res
          .status(successful.created)
          .send({ message: "Interest set successfully" });
      },
      (error) => {
        res
          .status(client_error.not_acceptable)
          .send({ message: "Failed", error });
      }
    );
  },

  verifyCode: (req, res) => {
    console.log(req.body);
    authModel.verifyCode(req.body).then(
      (resp) => {
        res.status(successful.accepted).send({ message: "valid" });
      },
      (error) => {
        res.status(client_error.not_acceptable).send({ message: error });
      }
    );
  },

  verifyResetLink: (req, res) => {
    console.log(req.body);
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    authModel.verifyResetLink({ email: req.body.email, token }).then(
      (resp) => {
        if (resp) {
          res.status(successful.accepted).send({ message: "verified" });
        } else {
          res.status(client_error.forbidden).send({ message: "not valid" });
        }
      },
      (error) => {
        res
          .status(server_error.internal_server_error)
          .send({ message: "failed" });
      }
    );
  },
};
