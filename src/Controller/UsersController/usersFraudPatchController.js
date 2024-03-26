const { ObjectId } = require("mongodb");
const { userCollection } = require("../../DatabaseConfig/Db");




const usersFraudPatchController = async (req, res) => {
    try {
        const { status } = req.body
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }
        const updateStatus = {
            $set: {
                status: status
            }
        }
        const statusResult = await userCollection.updateOne(query, updateStatus);
        const updatedUser = await userCollection.findOne(query)
        const fraudEmail = { agentemail: updatedUser.email }
        const deletedPropertiesResult = await propertyCollection.deleteMany(fraudEmail)
        res.send({ statusResult, deletedPropertiesResult })
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};
module.exports = usersFraudPatchController;