const { propertyCollection } = require("../../DatabaseConfig/Db");


const propertyAdvertisementGetController = async (req, res) => {
    try {
        const query = { status: "verified" };
        const cursor = propertyCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
        console.log("Request processed successfully");
    } catch (error) {
        console.error("Error in /advertisement endpoint:", error);
    }
};
module.exports = propertyAdvertisementGetController;