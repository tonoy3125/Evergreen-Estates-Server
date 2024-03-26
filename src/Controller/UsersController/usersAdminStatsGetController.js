const { userCollection } = require("../../DatabaseConfig/Db");
const { propertyCollection } = require("../../DatabaseConfig/Db");
const { reviewCollection } = require("../../DatabaseConfig/Db");
const { propertybroughtCollection } = require("../../DatabaseConfig/Db");
const { paymentCollection } = require("../../DatabaseConfig/Db");



const usersAdminStatsGetController = async (req, res) => {
    try {
        const users = await userCollection.estimatedDocumentCount()
        const properties = await propertyCollection.estimatedDocumentCount()
        const review = await reviewCollection.estimatedDocumentCount()
        const propertyBrought = await propertybroughtCollection.estimatedDocumentCount()
        const paidProperties = await paymentCollection.estimatedDocumentCount()

        // const payments = await paymentCollection.find().toArray()
        // const revenue = payments.reduce((total, payment) => total + parseFloat(payment.price), 0)



        const result = await paymentCollection.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: {
                            $toDouble: '$price'
                        }
                    }
                }
            }
        ]).toArray()
        const revenue = result.length > 0 ? result[0].totalRevenue : 0;


        res.send({
            users,
            properties,
            review,
            propertyBrought,
            paidProperties,
            revenue
        })
    } catch (error) {
        console.error('Error in /user/admin/:email endpoint:', error);
    }
};
module.exports = usersAdminStatsGetController;