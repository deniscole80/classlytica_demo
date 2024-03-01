module.exports = (sequelize, DataTypes) => {
    const ResetToken = sequelize.define('reset_token', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        token:{
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        createdAt:{
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: DataTypes.DATE,
    });
    return ResetToken;
};