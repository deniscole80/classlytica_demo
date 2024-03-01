module.exports = (sequelize, DataTypes) => {
  const AcceptedEmploymentRequest = sequelize.define(
    "accepted_employment_request",
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
  return AcceptedEmploymentRequest;
};
