const { userCollection } = require("../../DatabaseConfig/Db");


const usersPostController = async (req, res) => {
    try {
        const user = req.body;
        const query = { email: user.email };
        const existingUser = await userCollection.findOne(query);

        if (existingUser) {
            return res.send({ message: 'User already exists', insertId: null });
        }

        const result = await userCollection.insertOne(user);
        res.send(result);
    } catch (error) {
        console.error('Error in /users endpoint:', error);
    }
};
module.exports = usersPostController;