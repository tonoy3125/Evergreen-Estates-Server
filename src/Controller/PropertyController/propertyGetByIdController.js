const { ObjectId } = require("mongodb");
const { propertyCollection } = require("../../DatabaseConfig/Db");



const propertyGetByIdController = async (req, res) => {
    try {
        const id = req.params.id
        const query = { _id: new ObjectId(id) }
        const cursor = propertyCollection.find(query)
        const result = await cursor.toArray()
        res.send(result)
    } catch (error) {
        // Handle the error
        console.error(error)
    }
};
module.exports = propertyGetByIdController;