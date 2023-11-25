const express = require('express');
require('dotenv').config()
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
var jwt = require('jsonwebtoken');
const app = express()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const port = process.env.PORT || 5000


// middleware
app.use(cors())
app.use(express.json())








const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3il8g6r.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        // Collection
        const userCollection = client.db('evergreenDB').collection('users')





        // Users related Api

        // Users related Api **Get**
        app.get('/users', async (req, res) => {
            try {
                // const user = req.header
                // console.log(req.headers)
                const result = await userCollection.find().toArray()
                res.send(result)
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        });

        // Users Related Api *Post* 
        app.post('/users', async (req, res) => {
            try {
                const user = req.body;
                const query = { email: user.email };
                const existingUser = await userCollection.findOne(query);

                if (existingUser) {
                    return res.send({ message: 'User already exists', insertId: null });
                }

                const result = await userCollection.insertOne(user);
                res.send(result);
            } catch (error) {
                console.error('Error in /users endpoint:', error);
            }
        });







        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






// Initial Server Running
app.get('/', (req, res) => {
    res.send('evergreen is running')
})
app.listen(port, () => {
    console.log(`evergreen sitting on the port ${port}`)
})