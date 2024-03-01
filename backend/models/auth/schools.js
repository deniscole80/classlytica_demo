module.exports = (sequelize, DataTypes) => {
    const School = sequelize.define('school', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        school_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'denis'
        },
        phone_number1:{
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number2:{
            type: DataTypes.STRING,
            allowNull: false
        },
        address:{
            type: DataTypes.STRING,
            allowNull: false
        },        
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        institution_type: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        country:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Nigeria'
        },
        profile_img: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        cover_img: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        user_type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        verified: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        onboarded: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        complete_profile: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        createdAt:{
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: DataTypes.DATE,
    });
    return School;
};