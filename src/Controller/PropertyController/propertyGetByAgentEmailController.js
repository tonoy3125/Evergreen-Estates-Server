const { propertyCollection } = require("../../DatabaseConfig/Db");




const propertyGetByAgentEmailController = async (req, res) => {
    try {
        const find = req.params.agentemail;
        const query = { agentemail: find };
        console.log(query)
        const result = await propertyCollection.find(query).toArray()
        res.send(result);
    } catch (error) {
        console.error(error);
    }
};
module.exports = propertyGetByAgentEmailController;