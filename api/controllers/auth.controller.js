import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
    // req.body => tra ve du lieu nhap dang ky { username: 'user1', email: 'user1@gmail.com', password: 'thiennhan' }
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Lay ca du lieu da nhap luu vao database
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.json('Signup sunccessful');

    } catch(error) {
        next(error)
    }
}

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }

    try {
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'))
        }
        const token = jwt.sign(
            {id: validUser._id}, 
            process.env.JWT_SECRET
        );

        const {password: pass, ...rest} = validUser._doc;

        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(rest);

    } catch (error) {
        next(error)
    }
}