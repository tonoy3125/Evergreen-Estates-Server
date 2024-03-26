const jwt = require('jsonwebtoken');
const { access_jwt_token } = require("../../Secret");



const usersJwtPostController = async (req, res) => {
    try {
        const user = req.body;
        const token = jwt.sign(user, access_jwt_token, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        console.error("Error creating JWT:", error);
    }
};
module.exports = usersJwtPostController;