const { propertyCollection } = require("../../DatabaseConfig/Db");




const propertyGetByVerifiedController = async (req, res) => {
    try {
        const query = { status: "verified" }
        const filter = req.query
        const options = {
            sort: {}
        };
        if (filter.sort) {
            if (filter.sort === 'asc' || filter.sort === 'desc') {
                options.sort.price = filter.sort === 'asc' ? 1 : -1;
            } else {
                res.status(400).send('Invalid sort parameter. Use "asc" or "desc".');
                return;
            }
        }
        const result = await propertyCollection.find(query, options).toArray()
        res.send(result)
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
};
module.exports = propertyGetByVerifiedController;