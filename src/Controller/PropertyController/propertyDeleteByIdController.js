const { ObjectId } = require("mongodb");
const { propertyCollection } = require("../../DatabaseConfig/Db");



const propertyDeleteByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await propertyCollection.deleteOne(query);
        res.send(result);
    } catch (error) {
        console.error(error);
    }
};
module.exports = propertyDeleteByIdController;