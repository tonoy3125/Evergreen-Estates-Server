const { propertybroughtCollection } = require("../../DatabaseConfig/Db");



const propertyBroughtGetController = async (req, res) => {
    try {
        const result = await propertybroughtCollection.find().toArray();
        res.send(result);
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
};
module.exports = propertyBroughtGetController;