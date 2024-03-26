const { reviewCollection } = require("../../DatabaseConfig/Db");



const reviewPostController = async (req, res) => {
    try {
        const item = req.body;
        const result = await reviewCollection.insertOne(item);
        res.send(result);
    } catch (error) {
        console.error('Error in /menu route:', error);
    }
};
module.exports = reviewPostController;