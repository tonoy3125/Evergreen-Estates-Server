const { userCollection } = require("../DatabaseConfig/Db");


const verifyAdmin = async (req, res, next) => {
    try {
        const email = req.decoded.email;
        const query = { email: email };
        const user = await userCollection.findOne(query);
        const isAdmin = user?.role === 'admin';

        if (!isAdmin) {
            return res.status(403).send({ message: 'forbidden access' });
        }

        next();
    } catch (error) {
        console.error('Error in verifyAdmin middleware:', error);
    }
};

module.exports = verifyAdmin;