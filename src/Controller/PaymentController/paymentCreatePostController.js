


const paymentCreatePostController = async (req, res) => {
    try {
        const { price } = req.body;
        const amount = parseInt(price * 100);
        console.log(amount, 'amount inside the intent');
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method_types: ['card']
        });
        res.send({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        console.error('Error creating payment intent:', error.message);
    }
};
module.exports = paymentCreatePostController;