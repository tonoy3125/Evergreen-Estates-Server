const { propertybroughtCollection } = require("../../DatabaseConfig/Db");



const propertyBroughtGetByBuyerEmailController = async (req, res) => {
    try {
        const find = req.params.buyeremail;
        const query = { buyeremail: find };
        console.log(query)
        const result = await propertybroughtCollection.find(query).toArray()
        res.send(result);
    } catch (error) {
        console.error(error);
    }
};
module.exports = propertyBroughtGetByBuyerEmailController;