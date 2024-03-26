const { wishlistCollection } = require("../../DatabaseConfig/Db");


const wishlistGetByEmailController = async (req, res) => {
    try {
        const find = req.params.email;
        const query = { email: find };
        console.log(query)
        const result = await wishlistCollection.find(query).toArray()
        res.send(result);
    } catch (error) {
        console.error(error);
    }
};
module.exports = wishlistGetByEmailController;