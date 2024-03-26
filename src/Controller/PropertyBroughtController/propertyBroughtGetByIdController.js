const { ObjectId } = require("mongodb");
const { propertybroughtCollection } = require("../../DatabaseConfig/Db");



const propertyBroughtGetByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        console.log(query)
        const result = await propertybroughtCollection.find(query).toArray()
        res.send(result);
    } catch (error) {
        console.error(error);
    }
};
module.exports = propertyBroughtGetByIdController;