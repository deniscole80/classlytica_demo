module.exports = (sequelize, DataTypes) => {
    const UserInterest = sequelize.define('user_interests', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_type: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        interests:{
            type: DataTypes.ARRAY(DataTypes.STRING(500)),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: DataTypes.DATE,
    });
    return UserInterest;
};