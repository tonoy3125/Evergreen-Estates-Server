const { ObjectId } = require("mongodb");
const { propertybroughtCollection } = require("../../DatabaseConfig/Db");



const propertyBroughtPutByRequestIdController = async (req, res) => {
    try {
        const { status } = req.body;
        const requestId = req.params.requestId;
        const query = { _id: new ObjectId(requestId) }
        const acceptedRequest = await propertybroughtCollection.findOne(query);
        const updateAcceptedStatus = {
            $set: {
                status: status
            }
        }
        const accptedResult = await propertybroughtCollection.updateOne(query, updateAcceptedStatus);
        const rejectQuery = { propertiesId: acceptedRequest.propertiesId, _id: { $ne: new ObjectId(requestId) } }
        const updateRejectedStatus = {
            $set: {
                status: "rejected"
            }
        }
        const rejectedResult = await propertybroughtCollection.updateMany(rejectQuery, updateRejectedStatus)
        res.send({ accptedResult, rejectedResult })
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
};
module.exports = propertyBroughtPutByRequestIdController;