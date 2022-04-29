import { Schema, model } from 'mongoose';

const tokenSchema = new Schema({
    accessToken: {
        type: String,
        required: true,
        trim: true,
    },
    refreshToken: {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },

}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

export const tokenModel = model('token', tokenSchema);
