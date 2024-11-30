const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/userModel');
const sendMail = require('../helper/sendMail');
const { responseGenerator } = require('../helper/functions.helper');
const { vars } = require('../server/constants');
const { statusCodeVars } = require('../server/statusCode');
const { dataNotExist } = require('../helper/check_existence.helper');


exports.register = async (req, res, next) => {
    const { username, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) return res.status(400).json({ message: vars.EXISTS_USER });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword, role: role || 'user' });
        return responseGenerator(res, vars.CREATE_USER, statusCodeVars.CREATED, user)
    } catch (error) {
        next(error);
    }
},

    exports.login = async (req, res, next) => {
        const { username, email, password } = req.body;
        try {
            const user = await User.findOne({
                where: username ? { username } : { email }
            });
            if (!user) {
                return responseGenerator(res, vars.NOT_FOUND_USER, statusCodeVars.NOT_FOUND, null)
            }
            if (user.role === 'admin') {
                if (!username || (!password && !email)) {
                    return responseGenerator(res, vars.PROVIDE_ADMIN, statusCodeVars.BADREQUEST, null)
                }
                if (password) {
                    const isPasswordValid = await bcrypt.compare(password, user.password);
                    if (!isPasswordValid) {
                        return responseGenerator(res, vars.INVALID_PASSWORD, statusCodeVars.UNAUTHORIZED, null)
                    }
                } else if (email) {
                    await sendMail(email, "Login Successfully");
                }
            } else {
                if (password) {
                    const isPasswordValid = await bcrypt.compare(password, user.password);
                    if (!isPasswordValid) {
                        return responseGenerator(res, vars.INVALID_PASSWORD, statusCodeVars.UNAUTHORIZED, null)
                    }
                }
            }
            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            responseGenerator(res, vars.LOGIN, statusCodeVars.OK, token)
        } catch (error) {
            next(error);
        }
    },


    exports.requestPasswordReset = async (req, res, next) => {
        const { username } = req.body;
        try {
            const user = await User.findOne({ where: { username } });
            if (!user || user.role !== 'admin') return res.status(400).json({ message: vars.NOT_FOUND_USER });
            const verificationCode = crypto.randomBytes(3).toString('hex');
            user.resetToken = verificationCode;
            user.resetTokenExpires = Date.now() + 3600000;
            await user.save();
            await sendMail(user.email, "Reset Password ", verificationCode)
            responseGenerator(res, vars.SEND_CODE, statusCodeVars.OK, null)
        } catch (error) {
            next(error);
        }
    },

    exports.resetPassword = async (req, res, next) => {
        const { username, verificationCode, newPassword } = req.body;
        try {
            const user = await User.findOne({ where: { username } });
            if (!user) return res.status(400).json({ message: vars.NOT_FOUND_USER });
            if (user.role !== 'admin' || user.resetToken !== verificationCode || Date.now() > user.resetTokenExpires) {
                dataNotExist(false, vars.EXPIRED_CODE, statusCodeVars.BADREQUEST)
            }
            user.password = await bcrypt.hash(newPassword, 10);
            user.resetToken = null;
            user.resetTokenExpires = null;
            await user.save();
            responseGenerator(res, vars.RESET_PASSWORD, statusCodeVars.OK, null)
        } catch (error) {
            next(error);
        }
    }


