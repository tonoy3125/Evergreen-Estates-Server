const { ObjectId } = require("mongodb");
const { userCollection } = require("../../DatabaseConfig/Db");




const usersDeleteController = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await userCollection.deleteOne(query);
        res.send(result);
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};
module.exports = usersDeleteController;