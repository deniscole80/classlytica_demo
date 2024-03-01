module.exports = (sequelize, DataTypes) => {
  const DeclinedEmploymentRequest = sequelize.define(
    "declined_employment_request",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      request_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      staff_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      staff_type: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: DataTypes.DATE,
    }
  );
  return DeclinedEmploymentRequest;
};
