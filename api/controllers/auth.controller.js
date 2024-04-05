import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signUp = async (req, res) => {
    // req.body => tra ve du lieu nhap dang ky { username: 'user1', email: 'user1@gmail.com', password: 'thiennhan' }
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return res.status(400).json({ message: 'All fields are required '})
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

    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}