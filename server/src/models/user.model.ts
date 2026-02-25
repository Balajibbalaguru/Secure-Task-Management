import mongoose, { Schema, type Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

userSchema.set("toJSON", {
    transform: (_doc, ret) => {
        const record = ret as unknown as Record<string, unknown>;
        record["password"] = undefined;
        return record;
    },
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export { UserModel };
