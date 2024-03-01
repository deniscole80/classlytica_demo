module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('posts', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_type:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        text:{
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        video: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        image: {
            type: DataTypes.ARRAY(DataTypes.STRING(500)),
            allowNull: true,
            defaultValue: null
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        comments: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        shares: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        shared_post_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        post_type: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'post'
        },
        shared_by_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        shared_by_type: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        shared_by_username: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: DataTypes.DATE,
    });
    return Post;
};