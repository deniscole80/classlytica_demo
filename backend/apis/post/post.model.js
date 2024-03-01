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
const Post = require("../../models/post/post")(sequelize, Sequelize);
const Follow = require("../../models/user/follow")(sequelize, Sequelize);
const PostLike = require("../../models/post/post_like")(sequelize, Sequelize);
const PostShare = require("../../models/post/post_share")(sequelize, Sequelize);
const LikeNotification =
  require("../../models/notification/like_notifications")(sequelize, Sequelize);
const ShareNotification =
  require("../../models/notification/share_notifications")(
    sequelize,
    Sequelize
  );
const Op = Sequelize.Op;

// Post.sync({ alter: true });
// PostLike.sync({ alter: true });
// PostShare.sync({ alter: true });

exports.postModel = {
  createPost: (post) => {
    return new Promise((resolve, reject) => {
      Post.create(post).then(
        (post) => {
          resolve({ message: "created" });
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  fetchFeeds: ({ start, length, user_id, user_type }) => {
    return new Promise((resolve, reject) => {
      const pagination =
        start == 0 ? { limit: length } : { offset: start, limit: length };

      Follow.findAll({
        where: { follower_id: user_id, follower_type: user_type },
        attributes: ["user_id"],
      }).then(
        async (following) => {
          // console.log(following);
          let followingIds = [];
          followingIds = await following.map((f) => f.user_id);
          followingIds.push(user_id);
          console.log(followingIds);

          User.hasMany(Post, { foreignKey: "user_id" });
          School.hasMany(Post, { foreignKey: "user_id" });
          Post.hasMany(PostLike, { foreignKey: "post_id" });
          Post.hasMany(PostShare, { foreignKey: "post_id" });
          // Post.hasMany(SavedMedia, {foreignKey: 'post_id'});
          // SavedMedia.belongsTo(Post, {foreignKey: 'post_id'});
          PostShare.belongsTo(Post, { foreignKey: "post_id" });
          PostLike.belongsTo(Post, { foreignKey: "post_id" });
          Post.belongsTo(School, { foreignKey: "user_id" });
          Post.belongsTo(User, { foreignKey: "user_id" });
          Post.findAll({
            where: { user_id: followingIds },
            include: [User, School, PostLike, PostShare],
            order: [["id", "DESC"]],
            ...pagination,
          }).then(
            async (posts) => {
              console.log(posts);
              await posts.map(async (post) => {
                post.dataValues.user_type == 1
                  ? delete post.dataValues.user
                  : delete post.dataValues.school;

                const likes = post.dataValues.post_likes;
                const myLike = await likes.filter(
                  (like) => like.user_id == user_id
                );
                if (myLike.length > 0) {
                  post.dataValues.liked_post = true;
                } else {
                  post.dataValues.liked_post = false;
                }
                delete post.dataValues.post_likes;

                const shares = post.dataValues.post_shares;
                const myShare = await shares.filter(
                  (share) => share.user_id == user_id
                );
                if (myShare.length > 0) {
                  post.dataValues.shared_post = true;
                } else {
                  post.dataValues.shared_post = false;
                }
                delete post.dataValues.post_shares;
              });
              resolve(posts);
            },
            (err) => {
              reject({ error: err });
            }
          );
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  fetchMyFeeds: ({ start, length, user_id, user_type }) => {
    return new Promise((resolve, reject) => {
      const pagination =
        start == 0 ? { limit: length } : { offset: start, limit: length };

      Post.hasMany(PostLike, { foreignKey: "post_id" });
      Post.hasMany(PostShare, { foreignKey: "post_id" });
      PostShare.belongsTo(Post, { foreignKey: "post_id" });
      PostLike.belongsTo(Post, { foreignKey: "post_id" });
      Post.findAll({
        where: { user_id, user_type },
        include: [PostLike, PostShare],
        order: [["id", "DESC"]],
        ...pagination,
      }).then(
        async (posts) => {
          console.log(posts);
          await posts.map(async (post) => {
            const likes = post.dataValues.post_likes;
            const myLike = await likes.filter(
              (like) => like.user_id == user_id
            );
            if (myLike.length > 0) {
              post.dataValues.liked_post = true;
            } else {
              post.dataValues.liked_post = false;
            }
            delete post.dataValues.post_likes;

            const shares = post.dataValues.post_shares;
            const myShare = await shares.filter(
              (share) => share.user_id == user_id
            );
            if (myShare.length > 0) {
              post.dataValues.shared_post = true;
            } else {
              post.dataValues.shared_post = false;
            }
            delete post.dataValues.post_shares;
          });
          resolve(posts);
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  likePost: ({ user_id, user_type, post_id, poster_id, poster_type }) => {
    return new Promise(async (resolve, reject) => {
      const liked = await PostLike.findOne({
        where: { user_id, user_type, post_id },
      });
      if (liked === null) {
        PostLike.create({
          user_id,
          user_type,
          post_id,
          poster_id,
          poster_type,
        }).then(
          async (data) => {
            // console.log('Posted Comment', comm);
            await Post.increment(
              { likes: 1 },
              {
                where: {
                  [Op.or]: [{ id: post_id }, { shared_post_id: post_id }],
                },
              }
            );
            await LikeNotification.create({
              user_id,
              user_type,
              post_id,
              poster_id,
              poster_type,
            });

            // const post = await Post.findOne({where: {id: post_id}});
            // console.log('Liked post', post);
            // if(post.dataValues.image != ''){
            //     await LikedPhotos.create({user_id, image: post.dataValues.image});
            // }
            resolve({ message: "Liked", data });
          },
          (err) => {
            reject({ error: err });
          }
        );
      } else {
        await Post.decrement(
          { likes: 1 },
          { where: { [Op.or]: [{ id: post_id }, { shared_post_id: post_id }] } }
        );
        await PostLike.destroy({ where: { user_id, user_type, post_id } });
        resolve({ message: "unliked" });
      }
    });
  },

  sharePost: ({ user_id, user_type, post_id, username }) => {
    return new Promise(async (resolve, reject) => {
      Post.findOne({ where: { id: post_id } }).then(
        (post) => {
          console.log("Selected post", post);

          post.dataValues.shared_post_id = post.dataValues.id;
          post.dataValues.post_type = "shared";
          post.dataValues.shared_by_id = user_id;
          post.dataValues.shared_by_type = user_type;
          post.dataValues.shared_by_username = username;
          delete post.dataValues.id;

          Post.create(post.dataValues).then(
            async (pst) => {
              PostShare.create({ user_id, user_type, post_id }).then(
                async (data) => {
                  await Post.increment(
                    { shares: 1 },
                    {
                      where: {
                        [Op.or]: [{ id: post_id }, { shared_post_id: post_id }],
                      },
                    }
                  );
                  await ShareNotification.create({
                    user_id,
                    user_type,
                    post_id,
                    poster_id: post.dataValues.user_id,
                    poster_type: post.dataValues.user_type,
                  });
                  resolve({ message: "Shared" });
                },
                (err) => {
                  reject({ error: err });
                }
              );
            },
            (err) => {
              reject({ error: err, message: "Unable to share" });
            }
          );
        },
        (err) => {
          reject({ error: err, message: "Post not found" });
        }
      );
    });
  },
};
