import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    text: {
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

export const postModel = model('post', postSchema);
