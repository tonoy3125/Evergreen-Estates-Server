const { ObjectId } = require("mongodb");
const { wishlistCollection } = require("../../DatabaseConfig/Db");



const wishlistDeleteByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await wishlistCollection.deleteOne(query);
        res.send(result);
    } catch (error) {
        console.error(error);
    }
};
module.exports = wishlistDeleteByIdController;