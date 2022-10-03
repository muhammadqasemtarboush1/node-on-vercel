const User = require("../models/User");


exports.register = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({
            email,
            password,
        });
        sendToken(user, 200, res);
    } catch (err) {
        console.log(err, "register err");
        next(err);
    }
};



exports.getAllUsers = async (req, res, next) => {
    // const { email, password } = req.body;
    try {
        const users = await User.find();
        // sendToken(user, 200, res);
        res.json({ sucess: true, users });
    } catch (err) {
        console.log(err, "register err");
        next(err);
    }
};


const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res
        .status(statusCode)
        .json({ sucess: true, token, userId: user._id });
};
