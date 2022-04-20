import mongoose from 'mongoose';

const {
    Schema,
    model,
} = mongoose;

const studentSchema = new Schema({
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
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
        default: null,
    },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

studentSchema.virtual('status')
    .get(function () {
        // @ts-ignore
        return `${this.firstName} is student`;
    });

export const studentModel = model('student', studentSchema);
