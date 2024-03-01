const Sequelize = require("sequelize");
const sequelize = require("../../configs/connection");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

// Interest.sync({ alter: true });

exports.classlyticaModel = {
  createInterest: (interest) => {
    return new Promise((resolve, reject) => {
      Interest.create(interest).then(
        (interests) => {
          resolve(interests);
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },
};
