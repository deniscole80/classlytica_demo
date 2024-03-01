module.exports = (sequelize, DataTypes) => {
    const InstitutionType = sequelize.define('institution_type', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type:{
            type: DataTypes.STRING,
            allowNull: false
        },
        created_by:{
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: DataTypes.DATE,
    });
    return InstitutionType;
};