const { ObjectId } = require("mongodb");
const { propertybroughtCollection } = require("../../DatabaseConfig/Db");



const propertyBroughtPatchByRequestIdController = async (req, res) => {
    try {
        const { status } = req.body;
        const requestId = req.params.requestId;
        const query = { _id: new ObjectId(requestId) }
        const updateRejectedStatus = {
            $set: {
                status: status
            }
        }
        const rejectResult = await propertybroughtCollection.updateOne(query, updateRejectedStatus)
        res.send(rejectResult)
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
};
module.exports = propertyBroughtPatchByRequestIdController;