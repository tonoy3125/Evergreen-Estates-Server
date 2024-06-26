const express = require('express');
require('dotenv').config()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
var jwt = require('jsonwebtoken');
const app = express()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const formData = require('form-data')
const Mailgun = require('mailgun.js')
const mailgun = new Mailgun(formData)
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAIL_GUN_API_KEYS,
});
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
        const reportCollection = client.db('evergreenDB').collection('report')
        const wishlistCollection = client.db('evergreenDB').collection('wishlist')
        const propertybroughtCollection = client.db('evergreenDB').collection('propertyBrought')
        const paymentCollection = client.db('evergreenDB').collection('payments')











        // propertyBrought related api


        // propertyBrought related api **Get**
        app.get('/propertyBrought', async (req, res) => {
            try {
                const result = await propertybroughtCollection.find().toArray();
                res.send(result);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        });
        // ok


        app.get('/paymentBrought/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                console.log(query)
                const result = await propertybroughtCollection.find(query).toArray()
                res.send(result);
            } catch (error) {
                console.error(error);
            }
        });
        // okk





        // propertyBrought related api **Get** Buyer email
        app.get('/propertyBroughts/:agentemail', async (req, res) => {
            try {
                const find = req.params.agentemail;
                const query = { agentemail: find };
                console.log(query)
                const result = await propertybroughtCollection.find(query).toArray()
                res.send(result);
            } catch (error) {
                console.error(error);
            }
        });
        // okk
        // propertyBrought related api **Get** Buyer email
        app.get('/propertyBroughtsUser/:buyeremail', async (req, res) => {
            try {
                const find = req.params.buyeremail;
                const query = { buyeremail: find };
                console.log(query)
                const result = await propertybroughtCollection.find(query).toArray()
                res.send(result);
            } catch (error) {
                console.error(error);
            }
        });
        // okk


        // propertyBrought related api ** Post**
        app.post('/propertyBrought', async (req, res) => {
            try {
                const item = req.body;
                const result = await propertybroughtCollection.insertOne(item);
                res.send(result);
            } catch (error) {
                console.error('Error in /menu route:', error);
            }
        });
        // okk

        // propertyBrought related api ** Post**
        // update multiple data status
        app.put('/api/request/:requestId', async (req, res) => {
            const { status } = req.body;
            const requestId = req.params.requestId;
            const query = { _id: new ObjectId(requestId) }
            const acceptedRequest = await propertybroughtCollection.findOne(query);
            const updateAcceptedStatus = {
                $set: {
                    status: status
                }
            }
            const accptedResult = await propertybroughtCollection.updateOne(query, updateAcceptedStatus);
            const rejectQuery = { propertiesId: acceptedRequest.propertiesId, _id: { $ne: new ObjectId(requestId) } }
            const updateRejectedStatus = {
                $set: {
                    status: "rejected"
                }
            }
            const rejectedResult = await propertybroughtCollection.updateMany(rejectQuery, updateRejectedStatus)
            res.send({ accptedResult, rejectedResult })

        })
        // okk
        // update reject
        app.patch('/api/reject/:requestId', async (req, res) => {
            const { status } = req.body;
            const requestId = req.params.requestId;
            const query = { _id: new ObjectId(requestId) }
            const updateRejectedStatus = {
                $set: {
                    status: status
                }
            }
            const rejectResult = await propertybroughtCollection.updateOne(query, updateRejectedStatus)
            res.send(rejectResult)
        })
        // okk





        // WishList Related Api
        // WishList Related Api **Get**
        app.get('/wishlist', async (req, res) => {
            try {
                const result = await wishlistCollection.find().toArray();
                res.send(result);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        });
        // okk

        // WishList Related Api ** Get** By id
        app.get('/wishlists/:id', async (req, res) => {
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
        })
        // okk

        // WishList Related Api ** Get** By email
        app.get('/wishlister/:email', async (req, res) => {
            try {
                const find = req.params.email;
                const query = { email: find };
                console.log(query)
                const result = await wishlistCollection.find(query).toArray()
                res.send(result);
            } catch (error) {
                console.error(error);
            }
        });
        // okk


        // WishList Related Api **Post**
        app.post('/wishlist', async (req, res) => {
            try {
                const item = req.body;
                const result = await wishlistCollection.insertOne(item);
                res.send(result);
            } catch (error) {
                console.error('Error in /menu route:', error);
            }
        });
        // okk
        // WishList Related Api **Delete**
        app.delete('/wishlist/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await wishlistCollection.deleteOne(query);
                res.send(result);
            } catch (error) {
                console.error(error);
            }
        });
        // okk





        // Review related api
        // Review related api **Get**
        app.get('/review', async (req, res) => {
            try {
                const result = await reviewCollection.find().sort({ date: -1 }).toArray();
                res.send(result);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        });
        // okk
        // Review related api **Get** by email
        app.get('/myreviews/:email', async (req, res) => {
            try {
                const find = req.params.email;
                const query = { email: find };
                console.log(query)
                const result = await reviewCollection.find(query).toArray()
                res.send(result);
            } catch (error) {
                console.error(error);
            }
        });
        // okk
        // Review related api **Get** By ProductId
        app.get('/reviewer/:productId', async (req, res) => {
            try {
                const find = req.params.productId;
                const query = { productId: find };
                console.log(query)
                const result = await reviewCollection.find(query).toArray()
                res.send(result);
            } catch (error) {
                console.error(error);
            }
        });
        // okk


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
        // okk

        // Review related api **delete**
        app.delete('/review/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await reviewCollection.deleteOne(query);
                res.send(result);
            } catch (error) {
                console.error(error);
            }
        });
        // okk



        // report related api

        // Api to insert reported Properties
        app.post('/reportedProperties', async (req, res) => {
            try {
                const report = req.body;
                const result = await reportCollection.insertOne(report)
                res.send(result)
            }
            catch (error) {
                console.error("Error in inserting reported Property", error)
                res.status(500).send("Internal Server Error")
            }
        })
        // okk

        // Api to get reported properties
        app.get('/reportedProperties', async (req, res) => {
            try {
                const result = await reportCollection.find().toArray()
                res.send(result)
            }
            catch (error) {
                console.error('Error occured in get reportedProperties', error)
                res.status(500).send("Internal Server Error")
            }
        })
        // okk

        // Api to updte reported properties and delete properties
        app.patch('/reportedProperties/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const { status, propertyId } = req.body;
                const query = { _id: new ObjectId(id) }
                const updateReportStatus = {
                    $set: {
                        status: status
                    }
                }
                const updateResult = await reportCollection.updateOne(query, updateReportStatus)
                const propertyQuery = { _id: new ObjectId(propertyId) }
                const deleteProperty = await propertyCollection.deleteOne(propertyQuery)
                const reviewquery = { propertyId: propertyId }
                const deleteReview = await reviewCollection.deleteMany(reviewquery)
                res.send({ updateResult, deleteProperty, deleteReview })
            }
            catch (error) {
                console.error('Error occured in get reportedProperties', error)
                res.status(500).send("Internal Server Error")
            }
        })
        // okk


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
        // okk


        // Property related api **get** advertise section
        app.get("/advertise", async (req, res) => {
            try {
                const query = { advertise: true };
                const cursor = propertyCollection.find(query);
                const result = await cursor.toArray();
                res.send(result);
            } catch (error) {
                console.error("Error in /advertise endpoint:", error);
            }
        });
        // okk

        // Property related api **get** advertisement section
        app.get("/advertisement", async (req, res) => {
            try {
                const query = { status: "verified" };
                const cursor = propertyCollection.find(query);
                const result = await cursor.toArray();
                res.send(result);
                console.log("Request processed successfully");
            } catch (error) {
                console.error("Error in /advertisement endpoint:", error);
            }
        });
        // okk


        // Property related api **get** advertise section by id
        app.patch("/advertise/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    advertise: true,
                },
            };

            const result = await propertyCollection.updateOne(filter, updatedDoc);
            res.send(result);
        });
        // okk



        //  advertise  remov
        app.patch("/advertiseRemove/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    advertise: false,
                },
            };

            const result = await propertyCollection.updateOne(filter, updatedDoc);
            res.send(result);
        }
        );
        // okk





        // Property related api **get**
        app.get('/propertys/verified', async (req, res) => {
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
        })
        // okk

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
        // okk



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
        // okk

        // Property related api **Patch** 
        app.patch('/property/:id', async (req, res) => {
            const { status } = req.body;
            const query = { _id: new ObjectId(req.params.id) }
            const updateStatus = {
                $set: {
                    status: status
                }
            }
            const result = await propertyCollection.updateOne(query, updateStatus)
            res.send(result)
        })
        // okk


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
        // okkk

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
        // okk

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

        // okk





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
        // okk


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
        // okk
        // Verify Admin
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
        // okk

        const verifyAgent = async (req, res, next) => {
            try {
                const email = req.decoded.email;
                const query = { email: email };
                const user = await userCollection.findOne(query);
                const isAgent = user?.role === 'agent';

                if (!isAgent) {
                    return res.status(403).send({ message: 'forbidden access' });
                }

                next();
            } catch (error) {
                console.error('Error in verifyAgent middleware:', error);
            }
        };
        // okk




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
        // Ok

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
        // okk

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
        // okk

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
        // ok

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
        // okk


        // handle fraud agent
        app.patch('/users/fraud/:id', async (req, res) => {
            const { status } = req.body
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const updateStatus = {
                $set: {
                    status: status
                }
            }
            const statusResult = await userCollection.updateOne(query, updateStatus);
            const updatedUser = await userCollection.findOne(query)
            const fraudEmail = { agentemail: updatedUser.email }
            const deletedPropertiesResult = await propertyCollection.deleteMany(fraudEmail)
            res.send({ statusResult, deletedPropertiesResult })
        })
        // okk

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
        // okk



        // Payment Related Api
        // Payment Related Api
        app.get('/payments/:agentemail', async (req, res) => {
            try {
                const find = req.params.agentemail;
                const query = { agentemail: find };
                console.log(query)
                const result = await paymentCollection.find(query).toArray()
                res.send(result);
            } catch (error) {
                console.error(error);
            }
        });
        // okk





        // Payment Related Api **Post**
        app.post('/create-payment-intent', async (req, res) => {
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
        });
        // okk

        app.post('/payments', async (req, res) => {
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
        })
        // okk


        // Admin Stats Or Analytics
        app.get('/admin-stats', async (req, res) => {
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
        })


        // Agent Stats Or Analytics

        app.get('/agent-stats', async (req, res) => {

        })







        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
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