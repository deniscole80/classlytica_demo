const Sequelize = require("sequelize");
const sequelize = require("../../configs/connection");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const Op = Sequelize.Op;
const Credential = require("../../models/auth/credentials")(
  sequelize,
  Sequelize
);
const User = require("../../models/auth/users")(sequelize, Sequelize);
const School = require("../../models/auth/schools")(sequelize, Sequelize);
const VerificationCode = require("../../models/auth/verification_code")(
  sequelize,
  Sequelize
);
const InstitutionType = require("../../models/classlytica/institution_type")(
  sequelize,
  Sequelize
);
const UserToken = require("../../models/auth/user_token")(sequelize, Sequelize);
const ResetToken = require("../../models/auth/reset_token")(
  sequelize,
  Sequelize
);
const Interest = require("../../models/classlytica/interests")(
  sequelize,
  Sequelize
);
const UserInterest = require("../../models/auth/user_interest")(
  sequelize,
  Sequelize
);
const EmploymentRequest = require("../../models/schools/employment_request")(
  sequelize,
  Sequelize
);
const AssignedRole = require("../../models/schools/assigned_role")(
  sequelize,
  Sequelize
);
const Role = require("../../models/schools/role")(sequelize, Sequelize);

// Credential.sync({ alter: true });
// User.sync({ alter: true });
// School.sync({ alter: true });
// VerificationCode.sync({ alter: true });
// InstitutionType.sync({ alter: true });
// UserToken.sync({ alter: true });
// ResetToken.sync({ alter: true });
// UserInterest.sync({ alter: true });

exports.authModel = {
  fetchAllInterests: () => {
    return new Promise((resolve, reject) => {
      Interest.findAll().then(
        (interests) => {
          resolve(interests);
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  finishOnboarding: ({ user_id: id, user_type }) => {
    return new Promise(async (resolve, reject) => {
      if (user_type == 1) {
        School.update({ onboarded: true }, { where: { id } }).then(
          (boarded) => {
            resolve(boarded);
          },
          (err) => {
            reject({ error: err });
          }
        );
      } else {
        User.update({ onboarded: true }, { where: { id } }).then(
          (boarded) => {
            resolve(boarded);
          },
          (err) => {
            reject({ error: err });
          }
        );
      }
    });
  },

  login: ({ email }) => {
    return new Promise((resolve, reject) => {
      Credential.findOne({
        where: { email },
      }).then(
        (cred) => {
          if (cred) {
            const userType = cred.dataValues.user_type;
            if (userType == 1) {
              School.findOne({ where: { email } }).then(async (user) => {
                user.dataValues.userType = userType;
                const userInterests = await UserInterest.findOne({
                  where: { user_id: user.id, user_type: userType },
                  attributes: ["interests"],
                });
                resolve({
                  credential: cred.dataValues,
                  user: user.dataValues,
                  user_interests: userInterests,
                });
              });
            } else {
              User.findOne({ where: { email } }).then(async (user) => {
                user.dataValues.userType = userType;
                const userInterests = await UserInterest.findOne({
                  where: { user_id: user.id, user_type: userType },
                  attributes: ["interests"],
                });
                const employmentRequest = await EmploymentRequest.findOne({
                  where: { recipient_id: user.id, status: "confirmed" },
                  attributes: ["school_id"],
                });

                const fetchRole = await AssignedRole.findOne({
                  where: { user_id: user.id },
                });
                // console.log(fetchRoles);
                if (fetchRole) {
                  const role_id = fetchRole.dataValues.role_id;
                  const rol = await Role.findOne({ where: { id: role_id } });
                  rol.dataValues.access = await rol.dataValues.access.map((r) =>
                    JSON.parse(r)
                  );

                  console.log("Roles", rol.dataValues);
                  resolve({
                    credential: cred.dataValues,
                    user: user.dataValues,
                    user_interests: userInterests,
                    employer_id: employmentRequest
                      ? employmentRequest.dataValues.school_id
                      : null,
                    role: rol.dataValues,
                  });
                } else {
                  resolve({
                    credential: cred.dataValues,
                    user: user.dataValues,
                    user_interests: userInterests,
                    employer_id: employmentRequest
                      ? employmentRequest.dataValues.school_id
                      : null,
                    role: {},
                  });
                }
              });
            }
          } else {
            reject({ message: "Invalid login credentials" });
          }
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  setPassword: ({ email, password }) => {
    return new Promise((resolve, reject) => {
      Credential.findOne({ where: { email } }).then(async (cred) => {
        if (cred) {
          bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
              const setP = await Credential.update(
                { password: hash },
                { where: { email } }
              );
              if (setP) {
                resolve("successful");
              } else {
                resolve("failed");
              }
            });
          });
        } else {
          reject({ error: "User does not exist" });
        }
      });
    });
  },

  verifyEmail: (user) => {
    return new Promise((resolve, reject) => {
      const { email, v_code: code, username } = user;
      Credential.findOne({
        where: { [Op.or]: [{ email }, { username }] },
      }).then((cred) => {
        console.log(cred);
        if (cred) {
          reject({ error: "Username or Email Address already taken" });
        } else {
          VerificationCode.findOne({ where: { email } }).then(
            async (verifyExists) => {
              if (verifyExists) {
                const veri = await VerificationCode.update(
                  { code },
                  { where: { email } }
                );
                resolve(veri);
              } else {
                const veri = await VerificationCode.create({ email, code });
                resolve(veri);
              }
            }
          );
        }
      });
    });
  },

  register: (user) => {
    return new Promise((resolve, reject) => {
      Credential.findOne({
        where: {
          [Op.or]: [{ email: user.email }, { username: user.username }],
        },
      }).then((cred) => {
        // console.log(cred);
        if (cred) {
          reject({ error: "User already exists" });
        } else {
          bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
              const credentials = {
                email: user.email,
                password: hash,
                user_type: user.user_type,
                username: user.username,
              };
              Credential.create(credentials).then(
                (cred) => {
                  delete user.password;
                  if (cred.user_type == 1) {
                    School.create(user).then(
                      (usr) => {
                        resolve("successful");
                      },
                      (err) => {
                        reject({ error: err });
                      }
                    );
                  } else {
                    User.create(user).then(
                      (usr) => {
                        resolve("successful");
                      },
                      (err) => {
                        reject({ error: err });
                      }
                    );
                  }
                },
                (err) => {
                  reject(err);
                }
              );
            });
          });
        }
      });
    });
  },

  setPicture: ({ email, img, img_type, user_id }) => {
    return new Promise((resolve, reject) => {
      Credential.findOne({ where: { email } }).then(async (cred) => {
        // console.log("Credential", cred);
        if (cred) {
          const user_type = cred.dataValues.user_type;
          if (img_type == "p") {
            const updatePic =
              user_type == 1
                ? await School.update(
                    { profile_img: img },
                    { where: { id: user_id } }
                  )
                : await User.update(
                    { profile_img: img },
                    { where: { id: user_id } }
                  );
            if (updatePic) {
              resolve({ img, message: "successful" });
            } else {
              reject({ img, message: "failed" });
            }
          } else {
            const updatePic =
              user_type == 1
                ? await School.update(
                    { cover_img: img },
                    { where: { id: user_id } }
                  )
                : await User.update(
                    { cover_img: img },
                    { where: { id: user_id } }
                  );
            if (updatePic) {
              resolve({ img, message: "successful" });
            } else {
              reject({ img, message: "failed" });
            }
          }
        } else {
          reject({ error: "Invalid attempt" });
        }
      });
    });
  },

  setUserInterests: ({ user_id, user_type, interests }) => {
    return new Promise(async (resolve, reject) => {
      const userInterest = await UserInterest.findOne({
        where: { user_id, user_type },
      });
      console.log(userInterest);
      if (userInterest == null) {
        UserInterest.create({ user_id, user_type, interests }).then(
          (intrst) => {
            resolve(intrst);
          },
          (err) => {
            reject({ error: err });
          }
        );
      } else {
        UserInterest.update(
          { interests },
          { where: { user_id, user_type } }
        ).then(
          (intrst) => {
            resolve(intrst);
          },
          (err) => {
            reject({ error: err });
          }
        );
      }
    });
  },

  verifyCode: ({ email, code }) => {
    return new Promise((resolve, reject) => {
      Credential.findOne({ where: { email } }).then((cred) => {
        console.log(cred);
        if (cred) {
          reject({ error: "User already exists" });
        } else {
          VerificationCode.findOne({ where: { email, code } }).then(
            (cod) => {
              if (cod) {
                resolve(cod);
              } else {
                reject({ error: "invalid" });
              }
            },
            (err) => {
              reject({ error: err });
            }
          );
        }
      });
    });
  },

  registerToken: ({ token, user_id }) => {
    return new Promise((resolve, reject) => {
      UserToken.findOne({ where: { user_id } }).then(async (userToken) => {
        if (userToken) {
          const updateToken = await UserToken.update(
            { token },
            { where: { user_id } }
          );
          resolve(updateToken);
        } else {
          const createToken = await UserToken.create({ token, user_id });
          resolve(createToken);
        }
      });
    });
  },

  storeLink: ({ email, token }) => {
    return new Promise((resolve, reject) => {
      ResetToken.findOne({ where: { email } }).then(async (resetToken) => {
        if (resetToken) {
          const updateToken = await ResetToken.update(
            { token },
            { where: { email } }
          );
          resolve(updateToken);
        } else {
          const createToken = await ResetToken.create({ token, email });
          resolve(createToken);
        }
      });
    });
  },

  verifyResetLink: ({ email, token }) => {
    return new Promise((resolve, reject) => {
      ResetToken.findOne({ where: { email, token } }).then(
        async (resetToken) => {
          resolve(resetToken);
        }
      );
    });
  },
};
