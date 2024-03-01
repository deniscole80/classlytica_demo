module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    other_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "denis",
    },
    gender: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Nigeria",
    },
    profile_img: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    cover_img: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    user_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
    verified: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    onboarded: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    complete_profile: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    current_role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Open to work",
    },
    current_employer: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: DataTypes.DATE,
  });
  return User;
};
