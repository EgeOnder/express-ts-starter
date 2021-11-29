import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import logging from '../config/logging';

import config from '../config/config';

import User from '../models/UserModel';

const PATH = '/auth/';
const NAMESPACE = 'AUTH';

const router = Router();

router.post(PATH + 'register', async (req, res) => {
    try {
        const { firstName, lastName, email, password, checkPassword } =
            req.body;

        if (!(email || password || firstName || lastName || checkPassword))
            return res.json({ error: 'All fields are required!' });

        const userExists = await User.findOne({ email });

        if (userExists)
            return res.json({ error: 'This email already exists.' });

        const hashedPassword = await bcrypt.hash(password, config.auth.salt);

        const newUser = await User.create({
            first_name: firstName,
            last_name: lastName,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            {
                user_id: newUser._id,
                email,
            },
            config.auth.jwtKey,
            {
                expiresIn: config.auth.expiresIn,
            }
        );

        newUser.token = token;

        return res.json({ message: 'New user created!' });
    } catch (error) {
        logging.error(NAMESPACE, error.message);
        return res.json({ error });
    }
});

router.post(PATH + 'login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email || password))
            return res.json({ error: 'All fields are required!' });

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {
                    user_id: user._id,
                    email,
                },
                config.auth.jwtKey,
                {
                    expiresIn: config.auth.expiresIn,
                }
            );

            user.token = token;

            logging.success(NAMESPACE, 'Successful login EMAIL: ' + email);
            return res.json({ message: 'Logged in!' });
        }

        logging.error(
            NAMESPACE,
            'Failed login EMAIL: ' + email + ' PASS: ' + password
        );
        return res.json({ error: 'Invalid credentials!' });
    } catch (error) {
        logging.error(NAMESPACE, error.message);
        return res.json({ error });
    }
});

export default router;
