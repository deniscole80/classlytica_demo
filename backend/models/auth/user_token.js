module.exports = (sequelize, DataTypes) => {
    const UserToken = sequelize.define('user_token', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id:{
            type: DataTypes.INTEGER,
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
    return UserToken;
};