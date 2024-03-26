const { propertyCollection } = require("../../DatabaseConfig/Db");



const propertyGetController = async (req, res) => {
    try {
        const result = await propertyCollection.find().toArray();
        res.send(result);
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
};
module.exports = propertyGetController;