const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');
const User = require('../models/User');

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({ email: req.body.email });

    if (candidate) {
        // Check password
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

        if (passwordResult) {
            // Generate Token
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, { expiresIn: 3600 });

            res.status(200).json({ token: `Bearer ${token}` });
        } else {
            res.status(401).json({
                message: 'Некорректный пароль'
            })
        }
    } else {
        // Not User -> error
        res.status(404).json({
            message: 'Пользователь не найден'
        });
    }
};

module.exports.register = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        // User exists -> error
        res.status(409).json({
            message: 'Такой email уже занят'
        });
    } else {
        // Hash Password
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;

        // Create New User
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch (e) {

        }
    }
};
