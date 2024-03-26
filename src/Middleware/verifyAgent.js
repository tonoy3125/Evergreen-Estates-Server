const { userCollection } = require("../DatabaseConfig/Db");

const verifyAgent = async (req, res, next) => {
    try {
        const email = req.decoded.email;
        const query = { email: email };
        const user = await userCollection.findOne(query);
        const isAgent = user?.role === 'agent';

        if (!isAgent) {
            return res.status(403).send({ message: 'forbidden access' });
        }

        next();
    } catch (error) {
        console.error('Error in verifyAgent middleware:', error);
    }
};

module.exports = verifyAgent;