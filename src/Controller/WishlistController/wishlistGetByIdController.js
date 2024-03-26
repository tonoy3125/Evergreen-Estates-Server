const { ObjectId } = require("mongodb");
const { wishlistCollection } = require("../../DatabaseConfig/Db");



const wishlistGetByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const query = { _id: new ObjectId(id) }
        console.log(query)
        const wishlistItem = await wishlistCollection.findOne(query)
        console.log(wishlistItem)
        const priceRange = wishlistItem.price;
        const [minPrice, maxPrice] = priceRange
            .split('-')
            .map((price) => parseFloat(price.trim().replace(/,/g, '')));
        const result = {
            ...wishlistItem,
            price: [minPrice, maxPrice],
        };
        res.send(result);
    }
    catch (error) {
        console.error(error)
    }
};
module.exports = wishlistGetByIdController;