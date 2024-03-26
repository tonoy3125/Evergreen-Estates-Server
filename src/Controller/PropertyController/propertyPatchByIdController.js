const { ObjectId } = require("mongodb");
const { propertyCollection } = require("../../DatabaseConfig/Db");


const propertyPatchByIdController = async (req, res) => {
    try {
        const { status } = req.body;
        const query = { _id: new ObjectId(req.params.id) }
        const updateStatus = {
            $set: {
                status: status
            }
        }
        const result = await propertyCollection.updateOne(query, updateStatus)
        res.send(result)
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
};
module.exports = propertyPatchByIdController;