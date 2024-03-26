const { reviewCollection } = require("../../DatabaseConfig/Db");




const reviewGetByProductIdController = async (req, res) => {
    try {
        const find = req.params.productId;
        const query = { productId: find };
        console.log(query)
        const result = await reviewCollection.find(query).toArray()
        res.send(result);
    } catch (error) {
        console.error(error);
    }
};
module.exports = reviewGetByProductIdController;