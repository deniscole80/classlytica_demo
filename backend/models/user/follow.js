module.exports = (sequelize, DataTypes) => {
    const Follow = sequelize.define('follows', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        follower_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_type: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        follower_type: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: DataTypes.DATE,
    });
    return Follow;
};