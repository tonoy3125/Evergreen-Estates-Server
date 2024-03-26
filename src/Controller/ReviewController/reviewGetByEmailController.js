const { reviewCollection } = require("../../DatabaseConfig/Db");


const reviewGetByEmailController = async (req, res) => {
    try {
        const find = req.params.email;
        const query = { email: find };
        console.log(query)
        const result = await reviewCollection.find(query).toArray()
        res.send(result);
    } catch (error) {
        console.error(error);
    }
};
module.exports = reviewGetByEmailController;