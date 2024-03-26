const { userCollection } = require("../../DatabaseConfig/Db");



const usersGetController = async (req, res) => {
    try {
        // const user = req.header
        // console.log(req.headers)
        const result = await userCollection.find().toArray()
        res.send(result)
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};
module.exports = usersGetController;