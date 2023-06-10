import { Schema, model, models } from "mongoose";

const UserSxhema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required']
    },
    username: {
        type: String,
        unique: [true, 'Usename already exists'],
        required: [true, 'Usename is required']
    },
    image: {
        type: String,
    }
})

const User = models.User || model('User', UserSxhema)

export default User