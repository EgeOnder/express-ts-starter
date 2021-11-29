import { Schema, model } from 'mongoose';

interface User {
    first_name: string;
    last_name: string;
    email: string;
    token: string;
    password: string;
}

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: String,
    created_at: { type: Date, default: Date.now },
});

export default model<User>('User', userSchema);
