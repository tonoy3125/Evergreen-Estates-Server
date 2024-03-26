const { ObjectId } = require("mongodb");
const { propertyCollection } = require("../../DatabaseConfig/Db");



const propertyPutByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) }
        const options = { upsert: true };
        const updatedProperty = req.body
        const property = {
            $set: {
                propertyImage: updatedProperty.propertyImage,
                propertyname: updatedProperty.propertyname,
                agentname: updatedProperty.agentname,
                agentemail: updatedProperty.agentemail,
                agentImage: updatedProperty.agentImage,
                location: updatedProperty.location,
                price: updatedProperty.price,
                year: updatedProperty.year,
                bed: updatedProperty.bed,
                bath: updatedProperty.bath,
                size: updatedProperty.size,
                description: updatedProperty.description,
            }
        }
        const result = await propertyCollection.updateOne(filter, property, options)
        res.send(result)
    } catch (error) {
        // Handle the error
        console.error(error);
    }
};
module.exports = propertyPutByIdController;