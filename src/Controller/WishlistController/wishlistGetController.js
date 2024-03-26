const { wishlistCollection } = require("../../DatabaseConfig/Db");


const wishlistGetController = async (req, res) => {
    try {
        const result = await wishlistCollection.find().toArray();
        res.send(result);
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
};
module.exports = wishlistGetController;