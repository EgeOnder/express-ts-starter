import dotenv from 'dotenv';
dotenv.config();

const SERVER_PORT = process.env.PORT || 8000;

interface Auth {
    salt: number;
    jwtKey: string;
    expiresIn: number;
}

const AUTH: Auth = {
    salt: 16,
    jwtKey: process.env.JWT_KEY || 'change_this_in_.env',
    expiresIn: 60 * 60 * 1000 * 24 * 7 * 2, // 2 weeks
};

const RATE_LIMITER = {
    window: 15 * 60 * 1000,
    max: 100,
    message: 'Sent too many requests. Try again later.',
};

const SERVER = {
    port: SERVER_PORT,
};

const config = {
    server: SERVER,
    limiter: RATE_LIMITER,
    auth: AUTH,
};

export default config;
