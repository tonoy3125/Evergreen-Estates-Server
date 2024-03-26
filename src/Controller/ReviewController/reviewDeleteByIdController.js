const { ObjectId } = require("mongodb");
const { reviewCollection } = require("../../DatabaseConfig/Db");




const reviewDeleteByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await reviewCollection.deleteOne(query);
        res.send(result);
    } catch (error) {
        console.error(error);
    }
};
module.exports = reviewDeleteByIdController;