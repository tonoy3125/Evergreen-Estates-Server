const express = require('express');
require('dotenv').config()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const propertyCollection = client.db('evergreenDB').collection('property')
        const reviewCollection = client.db('evergreenDB').collection('review')





        // Review related api
        // Review related api **Get**
        app.get('/review', async (req, res) => {
            try {
                const result = await reviewCollection.find().toArray();
                res.send(result);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        });


        // Review related api **Post**
        app.post('/review', async (req, res) => {
            try {
                const item = req.body;
                const result = await reviewCollection.insertOne(item);
                res.send(result);
            } catch (error) {
                console.error('Error in /menu route:', error);
            }
        });


        // Property related api

        // Property related api **get**
        app.get('/property', async (req, res) => {
            try {
                const result = await propertyCollection.find().toArray();
                res.send(result);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        });

        // Get a property by agent email
        app.get('/postedproperty/:agentemail', async (req, res) => {
            try {
                const find = req.params.agentemail;
                const query = { agentemail: find };
                console.log(query)
                const result = await propertyCollection.find(query).toArray()
                res.send(result);
            } catch (error) {
                console.error(error);
            }
        });



        // Property related api **Post**
        app.post('/property', async (req, res) => {
            try {
                const item = req.body;
                const result = await propertyCollection.insertOne(item);
                res.send(result);
            } catch (error) {
                console.error('Error in /menu route:', error);
            }
        });


        // Properties related api ***Get****
        app.get('/properties/:id', async (req, res) => {
            try {
                const id = req.params.id
                const query = { _id: new ObjectId(id) }
                const cursor = propertyCollection.find(query)
                const result = await cursor.toArray()
                res.send(result)
            } catch (error) {
                // Handle the error
                console.error(error)
            }
        })

        // Properties related api ***Put****
        app.put('/properties/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const filter = { _id: new ObjectId(id) }
                const options = { upsert: true };
                const updatedProperty = req.body
                const property = {
                    $set: {
                        propertyImage: updatedProperty.propertyImage,
                        propertyname: updatedProperty.propertyname,
                        agentname: updatedProperty.agentname,
                        agentemail: updatedProperty.agentemail,
                        agentImage: updatedProperty.agentImage,
                        location: updatedProperty.location,
                        price: updatedProperty.price,
                        year: updatedProperty.year,
                        bed: updatedProperty.bed,
                        bath: updatedProperty.bath,
                        size: updatedProperty.size,
                        description: updatedProperty.description,
                    }
                }
                const result = await propertyCollection.updateOne(filter, property, options)
                res.send(result)
            } catch (error) {
                // Handle the error
                console.error(error);
            }
        })

        // Properties related api ***Delete****
        app.delete('/properties/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await propertyCollection.deleteOne(query);
                res.send(result);
            } catch (error) {
                console.error(error);
            }
        });





        // jwt related Api
        app.post('/jwt', async (req, res) => {
            try {
                const user = req.body;
                const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                res.send({ token });
            } catch (error) {
                console.error("Error creating JWT:", error);
            }
        });


        // Middlewares

        const verifyToken = (req, res, next) => {
            try {
                console.log('inside verify token', req.headers.authorization);

                if (!req.headers.authorization) {
                    return res.status(401).send({ message: 'unauthorized access' });
                }

                const token = req.headers.authorization.split(' ')[1];

                jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                    if (err) {
                        return res.status(401).send({ message: 'unauthorized access' });
                    }

                    req.decoded = decoded;
                    next();
                });
            } catch (error) {
                console.error("Error in verifyToken middleware:", error);
            }
        };

        const verifyAdmin = async (req, res, next) => {
            try {
                const email = req.decoded.email;
                const query = { email: email };
                const user = await userCollection.findOne(query);
                const isAdmin = user?.role === 'admin';

                if (!isAdmin) {
                    return res.status(403).send({ message: 'forbidden access' });
                }

                next();
            } catch (error) {
                console.error('Error in verifyAdmin middleware:', error);
            }
        };




        // Users related Api

        // Users related Api **Get**
        app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
            try {
                // const user = req.header
                // console.log(req.headers)
                const result = await userCollection.find().toArray()
                res.send(result)
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        });

        // admin email token
        app.get('/user/admin/:email', verifyToken, async (req, res) => {
            try {
                const email = req.params.email;

                if (email !== req.decoded.email) {
                    return res.status(403).send({ message: 'forbidden access' });
                }

                const query = { email: email };
                const user = await userCollection.findOne(query);
                let admin = false;

                if (user) {
                    admin = user?.role === 'admin';
                }

                res.send({ admin });
            } catch (error) {
                console.error('Error in /user/admin/:email endpoint:', error);
            }
        });

        // Agent email token
        app.get('/user/agent/:email', verifyToken, async (req, res) => {
            try {
                const email = req.params.email;

                if (email !== req.decoded.email) {
                    return res.status(403).send({ message: 'forbidden access' });
                }

                const query = { email: email };
                const user = await userCollection.findOne(query);
                let agent = false;

                if (user) {
                    agent = user?.role === 'agent';
                }

                res.send({ agent });
            } catch (error) {
                console.error('Error in /user/agent/:email endpoint:', error);
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

        // Users Related Api *patch*
        app.patch('/users/admin/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const { role } = req.body;
                const updatedRole = {
                    $set: {
                        role: role
                    }
                };
                const result = await userCollection.updateOne(query, updatedRole);
                res.send(result);
            } catch (error) {
                console.error("Error updating user role:", error);
            }
        });

        // User Related Api *Delete*
        app.delete('/users/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await userCollection.deleteOne(query);
                res.send(result);
            } catch (error) {
                console.error("Error deleting user:", error);
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