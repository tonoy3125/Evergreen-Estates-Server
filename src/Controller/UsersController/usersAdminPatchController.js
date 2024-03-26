const { ObjectId } = require("mongodb");
const { userCollection } = require("../../DatabaseConfig/Db");




const usersAdminPatchController = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const { role } = req.body;
        const updatedRole = {
            $set: {
                role: role
            }
        };
        const result = await userCollection.updateOne(query, updatedRole);
        res.send(result);
    } catch (error) {
        console.error("Error updating user role:", error);
    }
};
module.exports = usersAdminPatchController;