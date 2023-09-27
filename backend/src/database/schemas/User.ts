import mongoose, {Schema, SchemaTypes} from "mongoose";

const {String} = SchemaTypes

export interface User {
    id: string;
    discordId: string
    accessToken: string
    refreshToken: string
}

const UserSchema = new Schema<User>({
    discordId: {
        type: String,
        required: true,
        unique: true
    },
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    }
})

export const User = mongoose.model("users", UserSchema)