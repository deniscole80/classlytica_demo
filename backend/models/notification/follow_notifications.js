module.exports = (sequelize, DataTypes) => {
  const FollowNotification = sequelize.define("follow_notification", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    follower_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    following_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    following_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: DataTypes.DATE,
  });
  return FollowNotification;
};
