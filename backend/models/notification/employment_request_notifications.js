module.exports = (sequelize, DataTypes) => {
  const EmploymentRequestNotification = sequelize.define(
    "employment_request_notification",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      school_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      request_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      responded: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: DataTypes.DATE,
    }
  );
  return EmploymentRequestNotification;
};
