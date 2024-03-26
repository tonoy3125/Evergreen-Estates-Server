const { userCollection } = require("../../DatabaseConfig/Db");





const usersAgentGetByEmailController = async (req, res) => {
    try {
        const email = req.params.email;

        if (email !== req.decoded.email) {
            return res.status(403).send({ message: 'forbidden access' });
        }

        const query = { email: email };
        const user = await userCollection.findOne(query);
        let agent = false;

        if (user) {
            agent = user?.role === 'agent';
        }

        res.send({ agent });
    } catch (error) {
        console.error('Error in /user/agent/:email endpoint:', error);
    }
};
module.exports = usersAgentGetByEmailController;