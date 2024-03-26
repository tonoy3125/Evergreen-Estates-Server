const { ObjectId } = require("mongodb");
const {  propertybroughtCollection, paymentCollection } = require("../../DatabaseConfig/Db");



const paymentPostController = async (req, res) => {
    try {
        const payment = req.body;
        const boughtStatus = { _id: new ObjectId(payment.paymentId) }
        const updateStatus = {
            $set: {
                status: "Bought",
                transactionId: payment.transjectionId
            }
        }
        const status = await propertybroughtCollection.updateOne(boughtStatus, updateStatus)
        const result = await paymentCollection.insertOne(payment)
        console.log('payment info', payment)
        // Send User email about payment confirmation
        mg.messages
            .create(process.env.MAIL_SENDING_DOMAIN, {
                from: "Mailgun Sandbox <postmaster@sandbox4df33430222540ddba730294e501e1d2.mailgun.org>",
                to: ["shaifshajedt@gmail.com"],
                subject: "Evergreen Estates Payment Confirmation",
                text: "Testing some Mailgun awesomness!",
                html: `<div>
                    <h2>Thank you for your payment</h2>
                    <h3>Your Transaction Id : <strong>${payment.transjectionId} </strong></h3>
                    <p>We would like to get your feedback about your food</p>
                    </div>`
            })
            .then(msg => console.log(msg)) // logs response data
            .catch(err => console.log(err)); // logs any error`;



        res.send({ result, status })
    } catch (error) {
        console.error(error);
    }
};
module.exports = paymentPostController;