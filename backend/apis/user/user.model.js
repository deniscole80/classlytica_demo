const Sequelize = require("sequelize");
const sequelize = require("../../configs/connection");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { Op } = require("sequelize");
const user_interest = require("../../models/auth/user_interest");

const Credential = require("../../models/auth/credentials")(
  sequelize,
  Sequelize
);
const User = require("../../models/auth/users")(sequelize, Sequelize);
const Cv = require("../../models/user/cv")(sequelize, Sequelize);
const School = require("../../models/auth/schools")(sequelize, Sequelize);
const Follow = require("../../models/user/follow")(sequelize, Sequelize);
const Post = require("../../models/post/post")(sequelize, Sequelize);
const PostLike = require("../../models/post/post_like")(sequelize, Sequelize);
const PostShare = require("../../models/post/post_share")(sequelize, Sequelize);
const Student = require("../../models/schools/students")(sequelize, Sequelize);
const UserInterest = require("../../models/auth/user_interest")(
  sequelize,
  Sequelize
);
const FollowNotification =
  require("../../models/notification/follow_notifications")(
    sequelize,
    Sequelize
  );
const ParentList = require("../../models/schools/parent_list")(
  sequelize,
  Sequelize
);
const StudentParentGroup = require("../../models/schools/student_parent_group")(
  sequelize,
  Sequelize
);

// Follow.sync({ alter: true });
// Cv.sync({ alter: true });

exports.userModel = {
  followUser: ({ user_id, follower_id, user_type, follower_type }) => {
    return new Promise((resolve, reject) => {
      Follow.findOne({
        where: { user_id, follower_id, user_type, follower_type },
      }).then((res) => {
        if (res == null) {
          Follow.create({
            user_id,
            follower_id,
            user_type,
            follower_type,
          }).then(
            async (result) => {
              await FollowNotification.create({
                follower_id,
                follower_type,
                following_id: user_id,
                following_type: user_type,
              });
              resolve({ message: "Followed successfully" });
            },
            (err) => {
              reject({ error: err });
            }
          );
        } else {
          Follow.destroy({
            where: { user_id, follower_id, user_type, follower_type },
          }).then(
            async (result) => {
              resolve({ message: "Unfollowed successfully" });
            },
            (err) => {
              reject({ error: err });
            }
          );
        }
      });
    });
  },

  getFollowers: ({ user_id, user_type }) => {
    return new Promise((resolve, reject) => {
      let ff = { user_followers: [], school_followers: [] };
      User.hasMany(Follow, { foreignKey: "follower_id" });
      Follow.belongsTo(User, { foreignKey: "follower_id" });
      Follow.findAll({
        where: { user_id, user_type, follower_type: 2 },
        include: [User],
        order: [["id", "DESC"]],
      }).then(
        async (followers) => {
          if (followers.length > 0) {
            await followers.map(async (f, i) => {
              // console.log(f.dataValues);
              let checkFollow = await Follow.findOne({
                where: {
                  user_id: f.dataValues.follower_id,
                  follower_id: user_id,
                  follower_type: user_type,
                },
              });
              // console.log(checkFollow);
              if (checkFollow == null) {
                f.dataValues.following = false;
              } else {
                f.dataValues.following = true;
              }

              if (i == followers.length - 1) {
                ff.user_followers = followers;
                console.log("ff user", ff);
              }
            });

            School.hasMany(Follow, { foreignKey: "follower_id" });
            Follow.belongsTo(School, { foreignKey: "follower_id" });
            Follow.findAll({
              where: { user_id, user_type, follower_type: 1 },
              include: [School],
              order: [["id", "DESC"]],
            }).then(
              async (followers) => {
                await followers.map(async (f, i) => {
                  // console.log(f.dataValues);
                  let checkFollow = await Follow.findOne({
                    where: {
                      user_id: f.dataValues.follower_id,
                      follower_id: user_id,
                      follower_type: user_type,
                    },
                  });
                  // console.log(checkFollow);
                  if (checkFollow == null) {
                    f.dataValues.following = false;
                  } else {
                    f.dataValues.following = true;
                  }

                  if (i == followers.length - 1) {
                    ff.school_followers = followers;
                    console.log("ff school", ff);
                  }
                });
                resolve(ff);
              },
              (err) => {
                reject({ error: err });
              }
            );
          } else {
            School.hasMany(Follow, { foreignKey: "follower_id" });
            Follow.belongsTo(School, { foreignKey: "follower_id" });
            Follow.findAll({
              where: { user_id, user_type, follower_type: 1 },
              include: [School],
              order: [["id", "DESC"]],
            }).then(
              async (followers) => {
                if (followers.length > 0) {
                  await followers.map(async (f, i) => {
                    // console.log(f.dataValues);
                    let checkFollow = await Follow.findOne({
                      where: {
                        user_id: f.dataValues.follower_id,
                        follower_id: user_id,
                        follower_type: user_type,
                      },
                    });
                    // console.log(checkFollow);
                    if (checkFollow == null) {
                      f.dataValues.following = false;
                    } else {
                      f.dataValues.following = true;
                    }

                    if (i == followers.length - 1) {
                      ff.school_followers = followers;
                      console.log("ff else", ff);
                      resolve(ff);
                    }
                  });
                } else {
                  resolve(ff);
                }
              },
              (err) => {
                reject({ error: err });
              }
            );
          }
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  getFollowings: ({ user_id, user_type }) => {
    return new Promise((resolve, reject) => {
      let ff = { user_followings: [], school_followings: [] };
      User.hasMany(Follow, { foreignKey: "user_id" });
      Follow.belongsTo(User, { foreignKey: "user_id" });
      Follow.findAll({
        where: { follower_id: user_id, follower_type: user_type, user_type: 2 },
        include: [User],
        order: [["id", "DESC"]],
      }).then(
        async (followings) => {
          if (followings.length > 0) {
            await followings.map(async (f, i) => {
              // console.log(f.dataValues);
              f.following = true;
              if (i == followings.length - 1) {
                ff.user_followings = followings;
                console.log("ff user", ff);
              }
            });

            School.hasMany(Follow, { foreignKey: "user_id" });
            Follow.belongsTo(School, { foreignKey: "user_id" });
            Follow.findAll({
              where: {
                follower_id: user_id,
                follower_type: user_type,
                user_type: 1,
              },
              include: [School],
              order: [["id", "DESC"]],
            }).then(
              async (followings) => {
                await followings.map(async (f, i) => {
                  // console.log(f.dataValues);
                  f.following = true;
                  if (i == followings.length - 1) {
                    ff.school_followings = followings;
                    console.log("ff school", ff);
                  }
                });
                resolve(ff);
              },
              (err) => {
                reject({ error: err });
              }
            );
          } else {
            School.hasMany(Follow, { foreignKey: "user_id" });
            Follow.belongsTo(School, { foreignKey: "user_id" });
            Follow.findAll({
              where: {
                follower_id: user_id,
                follower_type: user_type,
                user_type: 1,
              },
              include: [School],
              order: [["id", "DESC"]],
            }).then(
              async (followings) => {
                if (followings.length > 0) {
                  await followings.map(async (f, i) => {
                    // console.log(f.dataValues);
                    f.following = true;
                    if (i == followings.length - 1) {
                      ff.school_followings = followings;
                      console.log("ff else", ff);
                      resolve(ff);
                    }
                  });
                } else {
                  resolve(ff);
                }
              },
              (err) => {
                reject({ error: err });
              }
            );
          }
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  getFollowSuggestions: (userData) => {
    return new Promise((resolve, reject) => {
      Credential.findAll({
        order: Sequelize.literal("random()"),
        limit: 20,
      }).then(
        async (cred) => {
          let suggestions = [];
          await cred.map(async (c, i) => {
            console.log("Credential", c.dataValues);
            const { user_type, email } = c.dataValues;
            if (user_type == 2) {
              let user = await User.findOne({ where: { email } });
              if (
                !(
                  user.dataValues.id == userData.user_id &&
                  user.dataValues.user_type == userData.user_type
                )
              ) {
                const following = await Follow.findOne({
                  where: {
                    follower_id: userData.user_id,
                    follower_type: userData.user_type,
                    user_id: user.dataValues.id,
                    user_type: user.dataValues.user_type,
                  },
                });
                if (!following) {
                  suggestions.push(user);
                }
              }
            } else {
              let school = await School.findOne({ where: { email } });
              if (
                !(
                  school.dataValues.id == userData.user_id &&
                  school.dataValues.user_type == userData.user_type
                )
              ) {
                const following = await Follow.findOne({
                  where: {
                    follower_id: userData.user_id,
                    follower_type: userData.user_type,
                    user_id: school.dataValues.id,
                    user_type: school.dataValues.user_type,
                  },
                });
                if (!following) {
                  suggestions.push(school);
                }
              }
            }

            if (cred.length - 1 == i) {
              resolve({ suggestions });
            }
          });
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  getProfileComplete: ({ user_id: id, user_type }) => {
    return new Promise(async (resolve, reject) => {
      const userData =
        user_type == 1
          ? await School.findOne({
              attributes: ["profile_img", "cover_img", "bio"],
              where: { id },
            })
          : await User.findOne({
              attributes: ["profile_img", "cover_img", "bio"],
              where: { id },
            });
      const interestList = await UserInterest.findOne({
        attributes: ["interests"],
        where: { user_id: id, user_type },
      });

      const { dataValues } = userData;
      const { interests } = interestList.dataValues;
      resolve({ user: dataValues, interests });
    });
  },

  viewProfile: ({
    user_id,
    user_type,
    visitor_id,
    visitor_type,
    start,
    length,
  }) => {
    return new Promise(async (resolve, reject) => {
      let profile = { user: {}, feeds: [] };
      const pagination =
        start == 0 ? { limit: length } : { offset: start, limit: length };
      // const user =
      //   user_type == 1
      //     ? await School.findOne({
      //         where: { id },
      //       })
      //     : await User.findOne({
      //         where: { id },
      //       });
      // resolve(user);

      user_type == 1
        ? School.hasMany(Post, { foreignKey: "user_id" })
        : User.hasMany(Post, { foreignKey: "user_id" });

      Post.hasMany(PostLike, { foreignKey: "post_id" });
      Post.hasMany(PostShare, { foreignKey: "post_id" });
      PostShare.belongsTo(Post, { foreignKey: "post_id" });
      PostLike.belongsTo(Post, { foreignKey: "post_id" });
      user_type == 1
        ? Post.belongsTo(School, { foreignKey: "user_id" })
        : Post.belongsTo(User, { foreignKey: "user_id" });
      Post.findAll({
        where: { user_id, user_type },
        include: [user_type == 1 ? School : User, PostLike, PostShare],
        order: [["id", "DESC"]],
        ...pagination,
      }).then(
        async (posts) => {
          console.log(posts);
          if (posts.length > 0) {
            profile["user"] =
              user_type == 1
                ? posts[0].dataValues.school
                : posts[0].dataValues.user;

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

              delete post.dataValues.user;
            });
            profile["feeds"] = posts;
          } else {
            const user =
              user_type == 1
                ? await School.findOne({ where: { id: user_id } })
                : await User.findOne({ where: { id: user_id } });
            profile["user"] = user;
          }

          const followers = await Follow.count({
            where: { user_id, user_type },
          });
          const followings = await Follow.count({
            where: { follower_id: user_id, follower_type: user_type },
          });
          const following = await Follow.findOne({
            where: {
              follower_id: visitor_id,
              follower_type: visitor_type,
              user_id,
              user_type,
            },
          });
          if (following) {
            profile["following"] = true;
          } else {
            profile["following"] = false;
          }

          const interests = await UserInterest.findOne({
            where: { user_id, user_type },
            attributes: ["interests"],
          });
          profile["interests"] = interests.dataValues.interests;
          profile["followers"] = followers;
          profile["followings"] = followings;
          resolve(profile);
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  createCv: (cv) => {
    return new Promise(async (resolve, reject) => {
      const userCv = await Cv.findOne({
        where: { user_id: cv.user_id, user_type: cv.user_type },
      });
      if (userCv) {
        Cv.update(cv, {
          where: { user_id: cv.user_id, user_type: cv.user_type },
        }).then(
          (cv) => {
            resolve({ message: "updated" });
          },
          (err) => {
            console.log(err);
            reject({ error: err });
          }
        );
      } else {
        Cv.create(cv).then(
          (cv) => {
            resolve({ message: "created" });
          },
          (err) => {
            reject({ error: err });
          }
        );
      }
    });
  },

  viewCv: ({ user_id, user_type }) => {
    return new Promise(async (resolve, reject) => {
      let expHolder = [];
      const cv = await Cv.findOne({ where: { user_id, user_type } });
      if (cv) {
        const experience = cv.dataValues.experience;
        await cv.dataValues.experience.map((exp, i) => {
          expHolder.push(JSON.parse(exp));

          if (i == experience.length - 1) {
            cv.dataValues.experience = expHolder;
            resolve(cv);
          }
        });
      } else {
        resolve({ message: "not found" });
      }
    });
  },

  fetchUserInterests: ({ user_id, user_type }) => {
    return new Promise(async (resolve, reject) => {
      const interests = await UserInterest.findOne({
        where: { user_id, user_type },
      });
      resolve(interests);
    });
  },

  completeUserProfile: ({ user_id: id, user_type, bio }) => {
    return new Promise(async (resolve, reject) => {
      if (user_type == 1) {
        await School.update({ bio }, { where: { id } }).then(
          (school) => {
            resolve({ message: "updated" });
          },
          (err) => {
            reject({ message: err });
          }
        );
      } else {
        await User.update({ bio }, { where: { id } }).then(
          (user) => {
            resolve({ message: "updated" });
          },
          (err) => {
            reject({ message: err });
          }
        );
      }
    });
  },

  editProfile: (userData) => {
    return new Promise(async (resolve, reject) => {
      const { user_id: id, user_type, bio } = userData;
      if (user_type == 1) {
        await School.update(
          {
            phone_number1: userData.phone_number1,
            phone_number2: userData.phoneNumber2,
            bio,
          },
          { where: { id } }
        ).then(
          (school) => {
            resolve({ message: "updated" });
          },
          (err) => {
            reject({ message: err });
          }
        );
      } else {
        await User.update(
          { phone_number: userData.phoneNumber, bio },
          { where: { id } }
        ).then(
          (user) => {
            resolve({ message: "updated" });
          },
          (err) => {
            reject({ message: err });
          }
        );
      }
    });
  },

  searchUser: ({ user_id, user_type, keyword }) => {
    return new Promise(async (resolve, reject) => {
      const users = await User.findAll({
        where: {
          [Op.or]: [
            { first_name: { [Op.iLike]: `%${keyword}%` } },
            { last_name: { [Op.iLike]: `%${keyword}%` } },
            { other_name: { [Op.iLike]: `%${keyword}%` } },
            { username: { [Op.iLike]: `%${keyword}%` } },
          ],
        },
        limit: 10,
      });

      const schools = await School.findAll({
        where: {
          [Op.or]: [[{ school_name: { [Op.iLike]: `%${keyword}%` } }]],
        },
        limit: 10,
      });

      resolve({ users, schools });
    });
  },

  fetchMyKids: ({ user_id, user_type }) => {
    return new Promise(async (resolve, reject) => {
      const fetchSchoolIds = await ParentList.findAll({
        where: { parent_id: user_id },
        attributes: ["school_id"],
      });

      let myKidsId = [];

      await fetchSchoolIds.map(async (schoolData, index) => {
        let schoolId = schoolData.dataValues.school_id;
        await StudentParentGroup.findAll({
          where: { school_id: schoolId },
          attributes: ["group"],
        }).then(
          async (group) => {
            console.log("Group", JSON.parse(group[0].dataValues.group));
            const myGroup = JSON.parse(group[0].dataValues.group);
            const isParentId = myGroup.parents.find(
              (parentId) => parentId == user_id
            );
            let myStudents = isParentId ? myGroup.students : [];
            myKidsId = [...myKidsId, ...myStudents];
            if (index == fetchSchoolIds.length - 1) {
              console.log("MyKidsId", myKidsId);
              const students = await Student.findAll({
                where: {
                  id: myKidsId,
                },
              });
              resolve(students);
            }
          },
          (err) => {
            reject(err);
          }
        );
      });

      // const schools = await School.findAll({
      //   where: {
      //     [Op.or]: [[{ school_name: { [Op.iLike]: `%${keyword}%` } }]],
      //   },
      //   limit: 10,
      // });

      // resolve({ users, schools });
    });
  },

  fetchParentKids: ({ employer_id, parent_id }) => {
    return new Promise(async (resolve, reject) => {
      let schoolId = employer_id;
      await StudentParentGroup.findOne({
        where: { school_id: schoolId },
        attributes: ["group"],
      }).then(
        async (group) => {
          console.log("Group", JSON.parse(group.dataValues.group));
          const myGroup = JSON.parse(group.dataValues.group);
          const isParentId = myGroup.parents.find(
            (parentId) => parentId == parent_id
          );
          let myStudents = isParentId ? myGroup.students : [];
          const myKidsId = [...myStudents];
          console.log("MyKidsId", myKidsId);
          const students = await Student.findAll({
            where: {
              id: myKidsId,
            },
          });
          resolve(students);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
};
