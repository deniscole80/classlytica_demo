module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define("subject", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    school_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    staff_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    staff_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subject_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    class_ids: {
      type: DataTypes.ARRAY(DataTypes.STRING(5000)),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: DataTypes.DATE,
  });
  return Subject;
};
