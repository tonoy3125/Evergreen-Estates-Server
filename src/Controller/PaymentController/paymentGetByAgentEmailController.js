const { paymentCollection } = require("../../DatabaseConfig/Db");



const paymentGetByAgentEmailController = async (req, res) => {
    try {
        const find = req.params.agentemail;
        const query = { agentemail: find };
        console.log(query)
        const result = await paymentCollection.find(query).toArray()
        res.send(result);
    } catch (error) {
        console.error(error);
    }
};
module.exports = paymentGetByAgentEmailController;