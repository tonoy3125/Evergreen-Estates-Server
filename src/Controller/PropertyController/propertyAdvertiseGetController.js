const { propertyCollection } = require("../../DatabaseConfig/Db");


const propertyAdvertiseGetController = async (req, res) => {
    try {
        const query = { advertise: true };
        const cursor = propertyCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
    } catch (error) {
        console.error("Error in /advertise endpoint:", error);
    }
};
module.exports = propertyAdvertiseGetController;