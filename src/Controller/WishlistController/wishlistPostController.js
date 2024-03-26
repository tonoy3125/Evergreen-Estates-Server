const { wishlistCollection } = require("../../DatabaseConfig/Db");


const wishlistPostController = async (req, res) => {
    try {
        const item = req.body;
        const result = await wishlistCollection.insertOne(item);
        res.send(result);
    } catch (error) {
        console.error('Error in /menu route:', error);
    }
};
module.exports = wishlistPostController;