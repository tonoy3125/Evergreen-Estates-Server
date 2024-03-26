const { propertyCollection } = require("../../DatabaseConfig/Db");


const propertyPostController = async (req, res) => {
    try {
        const item = req.body;
        const result = await propertyCollection.insertOne(item);
        res.send(result);
    } catch (error) {
        console.error('Error in /menu route:', error);
    }
};
module.exports = propertyPostController;