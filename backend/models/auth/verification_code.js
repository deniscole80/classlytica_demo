module.exports = (sequelize, DataTypes) => {
    const VerificationCode = sequelize.define('verification_code', {
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
        code:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt:{
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: DataTypes.DATE,
    });
    return VerificationCode;
};