import mongoose, { Schema, type Document, type Types } from "mongoose";

export interface ITask extends Document {
    title: string;
    description: string;
    completed: boolean;
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 200,
        },
        description: {
            type: String,
            default: "",
            trim: true,
            maxlength: 1000,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

taskSchema.index({ userId: 1, createdAt: -1 });

const TaskModel = mongoose.model<ITask>("Task", taskSchema);

export { TaskModel };
