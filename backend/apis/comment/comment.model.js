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
const Comment = require("../../models/comment/comment")(sequelize, Sequelize);
const CommentNotification =
  require("../../models/notification/comment_notifications")(
    sequelize,
    Sequelize
  );
const Post = require("../../models/post/post")(sequelize, Sequelize);
const Op = Sequelize.Op;

// Comment.sync({ alter: true });

exports.commentModel = {
  createComment: (comm) => {
    return new Promise((resolve, reject) => {
      Comment.create(comm).then(
        async (comment) => {
          console.log("comment", comment);
          await Post.increment(
            { comments: 1 },
            {
              where: {
                [Op.or]: [
                  { id: comm.post_id },
                  { shared_post_id: comm.post_id },
                ],
              },
            }
          );
          const { user_id, user_type, post_id, poster_id, poster_type, id } =
            comment.dataValues;
          await CommentNotification.create({
            user_id,
            user_type,
            post_id,
            poster_id,
            poster_type,
            comment_id: id,
          });
          resolve({ message: "created" });
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  fetchComments: ({ start, length, post_id, poster_id, poster_type }) => {
    return new Promise((resolve, reject) => {
      User.hasMany(Comment, { foreignKey: "user_id" });
      School.hasMany(Comment, { foreignKey: "user_id" });
      Comment.belongsTo(School, { foreignKey: "user_id" });
      Comment.belongsTo(User, { foreignKey: "user_id" });
      Comment.findAll({
        where: { post_id },
        include: [User, School],
        order: [["id", "ASC"]],
      }).then(
        async (comments) => {
          console.log(comments);
          await comments.map((comment) => {
            comment.dataValues.user_type == 1
              ? delete comment.dataValues.user
              : delete comment.dataValues.school;
          });
          resolve(comments);
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },
};
