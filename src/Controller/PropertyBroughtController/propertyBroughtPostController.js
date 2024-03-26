const { propertybroughtCollection } = require("../../DatabaseConfig/Db");



const propertyBroughtPostController = async (req, res) => {
    try {
        const item = req.body;
        const result = await propertybroughtCollection.insertOne(item);
        res.send(result);
    } catch (error) {
        console.error('Error in /menu route:', error);
    }
};
module.exports = propertyBroughtPostController;