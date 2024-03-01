module.exports = (sequelize, DataTypes) => {
    const Interests = sequelize.define('interests', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        interest:{
            type: DataTypes.STRING,
            allowNull: false
        },
        created_by:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: DataTypes.DATE,
    });
    return Interests;
};