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
const Post = require("../../models/post/post")(sequelize, Sequelize);
const LikeNotification =
  require("../../models/notification/like_notifications")(sequelize, Sequelize);
const CommentNotification =
  require("../../models/notification/comment_notifications")(
    sequelize,
    Sequelize
  );
const ShareNotification =
  require("../../models/notification/share_notifications")(
    sequelize,
    Sequelize
  );
const FollowNotification =
  require("../../models/notification/follow_notifications")(
    sequelize,
    Sequelize
  );
const InterestNotification =
  require("../../models/notification/interest_notifications")(
    sequelize,
    Sequelize
  );
const Follow = require("../../models/user/follow")(sequelize, Sequelize);
const EmploymentRequestNotification =
  require("../../models/notification/employment_request_notifications")(
    sequelize,
    Sequelize
  );
const EmploymentRequest = require("../../models/schools/employment_request")(
  sequelize,
  Sequelize
);

// LikeNotification.sync({ alter: true });
// ShareNotification.sync({ alter: true });
// CommentNotification.sync({ alter: true });
// FollowNotification.sync({ alter: true });
// InterestNotification.sync({ alter: true });
// EmploymentRequestNotification.sync({ alter: true });

exports.notificationModel = {
  getLikeNotifications: ({ poster_id, poster_type, start, length }) => {
    return new Promise((resolve, reject) => {
      const pagination =
        start == 0 ? { limit: length } : { offset: start, limit: length };

      User.hasMany(LikeNotification, { foreignKey: "user_id" });
      School.hasMany(LikeNotification, { foreignKey: "user_id" });
      Post.hasMany(LikeNotification, { foreignKey: "post_id" });
      LikeNotification.belongsTo(Post, { foreignKey: "post_id" });
      LikeNotification.belongsTo(School, { foreignKey: "user_id" });
      LikeNotification.belongsTo(User, { foreignKey: "user_id" });
      LikeNotification.findAll({
        where: { poster_id, poster_type },
        include: [User, School, Post],
        order: [["id", "DESC"]],
        ...pagination,
      }).then(
        async (notifications) => {
          await notifications.map(async (notification) => {
            notification.dataValues.user_type == 1
              ? delete notification.dataValues.user
              : delete notification.dataValues.school;
          });
          resolve(notifications);
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  getShareNotifications: ({ poster_id, poster_type, start, length }) => {
    return new Promise((resolve, reject) => {
      const pagination =
        start == 0 ? { limit: length } : { offset: start, limit: length };

      User.hasMany(ShareNotification, { foreignKey: "user_id" });
      School.hasMany(ShareNotification, { foreignKey: "user_id" });
      Post.hasMany(ShareNotification, { foreignKey: "post_id" });
      ShareNotification.belongsTo(Post, { foreignKey: "post_id" });
      ShareNotification.belongsTo(School, { foreignKey: "user_id" });
      ShareNotification.belongsTo(User, { foreignKey: "user_id" });
      ShareNotification.findAll({
        where: { poster_id, poster_type },
        include: [User, School, Post],
        order: [["id", "DESC"]],
        ...pagination,
      }).then(
        async (notifications) => {
          await notifications.map(async (notification) => {
            notification.dataValues.user_type == 1
              ? delete notification.dataValues.user
              : delete notification.dataValues.school;
          });
          resolve(notifications);
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  getFollowNotifications: ({ following_id, following_type, start, length }) => {
    return new Promise((resolve, reject) => {
      const pagination =
        start == 0 ? { limit: length } : { offset: start, limit: length };

      User.hasMany(FollowNotification, { foreignKey: "follower_id" });
      School.hasMany(FollowNotification, { foreignKey: "follower_id" });
      FollowNotification.belongsTo(School, { foreignKey: "follower_id" });
      FollowNotification.belongsTo(User, { foreignKey: "follower_id" });
      FollowNotification.findAll({
        where: { following_id, following_type },
        include: [User, School],
        order: [["id", "DESC"]],
        ...pagination,
      }).then(
        async (notifications) => {
          await notifications.map(async (notification, i) => {
            notification.dataValues.follower_type == 1
              ? delete notification.dataValues.user
              : delete notification.dataValues.school;

            console.log("notification", notification.dataValues);
            const following = await Follow.findOne({
              where: {
                follower_id: notification.dataValues.following_id,
                follower_type: notification.dataValues.following_type,
                user_id: notification.dataValues.follower_id,
                user_type: notification.dataValues.follower_type,
              },
            });
            console.log("following", following);
            if (following) {
              notification.dataValues["following"] = true;
            } else {
              notification.dataValues["following"] = false;
            }

            if (notifications.length - 1 == i) {
              resolve(notifications);
            }
          });
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  getCommentNotifications: ({ poster_id, poster_type, start, length }) => {
    return new Promise((resolve, reject) => {
      const pagination =
        start == 0 ? { limit: length } : { offset: start, limit: length };

      User.hasMany(CommentNotification, { foreignKey: "user_id" });
      School.hasMany(CommentNotification, { foreignKey: "user_id" });
      Post.hasMany(CommentNotification, { foreignKey: "post_id" });
      CommentNotification.belongsTo(Post, { foreignKey: "post_id" });
      CommentNotification.belongsTo(School, { foreignKey: "user_id" });
      CommentNotification.belongsTo(User, { foreignKey: "user_id" });
      CommentNotification.findAll({
        where: { poster_id, poster_type },
        include: [User, School, Post],
        order: [["id", "DESC"]],
        ...pagination,
      }).then(
        async (notifications) => {
          await notifications.map(async (notification) => {
            notification.dataValues.user_type == 1
              ? delete notification.dataValues.user
              : delete notification.dataValues.school;
          });
          resolve(notifications);
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  employmentRequestNotifications: ({ user_id, user_type, start, length }) => {
    return new Promise((resolve, reject) => {
      const pagination =
        start == 0 ? { limit: length } : { offset: start, limit: length };

      User.hasMany(EmploymentRequestNotification, { foreignKey: "user_id" });
      School.hasMany(EmploymentRequestNotification, {
        foreignKey: "school_id",
      });
      EmploymentRequest.hasMany(EmploymentRequestNotification, {
        foreignKey: "request_id",
      });
      EmploymentRequestNotification.belongsTo(EmploymentRequest, {
        foreignKey: "request_id",
      });
      EmploymentRequestNotification.belongsTo(School, {
        foreignKey: "school_id",
      });
      EmploymentRequestNotification.belongsTo(User, { foreignKey: "user_id" });
      EmploymentRequestNotification.findAll({
        where: user_type == 1 ? { school_id: user_id } : { user_id },
        include: [User, School, EmploymentRequest],
        order: [["id", "DESC"]],
        ...pagination,
      }).then(
        async (notifications) => {
          // await notifications.map(async (notification) => {
          //   notification.dataValues.user_type == 1
          //     ? delete notification.dataValues.user
          //     : delete notification.dataValues.school;
          // });
          resolve(notifications);
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },
};
