import { Schema, model } from 'mongoose';
import { UserRole } from '../constants';

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 120,
    },
    city: {
        type: String,
        required: false,
        default: 'Not city',
    },
    role: {
        type: String,
        default: UserRole.USER,
        enum: Object.values(UserRole),
    },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

export const userModel = model('user', userSchema);
