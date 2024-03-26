const { propertybroughtCollection } = require("../../DatabaseConfig/Db");



const propertyBroughtGetByAgentEmailController = async (req, res) => {
    try {
        const find = req.params.agentemail;
        const query = { agentemail: find };
        console.log(query)
        const result = await propertybroughtCollection.find(query).toArray()
        res.send(result);
    } catch (error) {
        console.error(error);
    }
};
module.exports = propertyBroughtGetByAgentEmailController;