const { ObjectId } = require("mongodb");
const { propertyCollection } = require("../../DatabaseConfig/Db");




const propertyAdvertisePatchByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
            $set: {
                advertise: true,
            },
        };

        const result = await propertyCollection.updateOne(filter, updatedDoc);
        res.send(result);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};
module.exports = propertyAdvertisePatchByIdController;