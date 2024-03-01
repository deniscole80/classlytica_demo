module.exports = (sequelize, DataTypes) => {
  const Cv = sequelize.define("cv", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pry_school: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sec_school: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    university: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience: {
      type: DataTypes.ARRAY(DataTypes.STRING(2000)),
      allowNull: false,
      //   async get() {
      //     let returnValue = [];
      //     const rawValue = this.getDataValue("experience");
      //     await rawValue.map((v, i) => {
      //       if (v !== 1) {
      //         returnValue.push(JSON.parse(v));
      //       } else {
      //         returnValue.push(v);
      //       }

      //       if (i !== rawValue.length - 1) {
      //         return returnValue;
      //       }
      //     });
      //   },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: DataTypes.DATE,
  });
  return Cv;
};
