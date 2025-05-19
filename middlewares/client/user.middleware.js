const User = require("../../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
    if(!req.headers.authorization){
        res.json({
            code: "error",
            message: "Vui lòng gửi kèm theo token"
        });

        return;
    }

    const token = req.header.authorization.split("")[1];

    const existUser = await User.findOne({
        token: token,
        deleted: false
    });

    if(!existUser){
        res.json({
            code: "error", 
            message: "Token không hợp lệ"
        });

        next();
    }
}