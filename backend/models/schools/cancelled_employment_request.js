module.exports = (sequelize, DataTypes) => {
  const CancelledEmploymentRequest = sequelize.define(
    "cancelled_employment_request",
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
        allowNull: false,
      },
      staff_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: DataTypes.DATE,
    }
  );
  return CancelledEmploymentRequest;
};
