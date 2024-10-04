import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.js';

export const User = sequelize.define('users', {
    email: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});
