import { Schema, model } from 'mongoose';

const actionTokenSchema = new Schema({
    actionToken: {
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

export const actionTokenModel = model('actiontoken', actionTokenSchema);
