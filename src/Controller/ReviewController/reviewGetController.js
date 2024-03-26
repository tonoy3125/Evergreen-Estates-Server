const { reviewCollection } = require("../../DatabaseConfig/Db");


const reviewGetController = async (req, res) => {
    try {
        const result = await reviewCollection.find().sort({ date: -1 }).toArray();
        res.send(result);
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
};
module.exports = reviewGetController;