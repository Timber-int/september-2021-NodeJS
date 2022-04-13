import mongoose from 'mongoose';

const {
    Schema,
    model,
} = mongoose;

const teacherSchema = new Schema({
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
    age: {
        type: Number,
        required: true,
    },
    classNumber: {
        type: Number,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

export const teacherModel = model('teacher', teacherSchema);
