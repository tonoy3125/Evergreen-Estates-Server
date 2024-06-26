const jwt = require('jsonwebtoken');
const { access_jwt_token } = require("../Secret");



const verifyToken = (req, res, next) => {
    try {
        console.log('inside verify token', req.headers.authorization);

        if (!req.headers.authorization) {
            return res.status(401).send({ message: 'unauthorized access' });
        }

        const token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, access_jwt_token, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: 'unauthorized access' });
            }

            req.decoded = decoded;
            next();
        });
    } catch (error) {
        console.error("Error in verifyToken middleware:", error);
    }
};

module.exports = verifyToken;