const { MongoClient } = require("mongodb");
const { databaseUrl } = require("../Secret");



// MongoDB Client
const client = new MongoClient(databaseUrl);

const mongodbConnection = async () => {
    try {
        await client.connect();
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("MongoDB Not Connected");
    }
};

const evergreenDB = client.db("diagnosticCenterDB");

const userCollection = evergreenDB.collection("users");
const propertyCollection = evergreenDB.collection("property");
const reviewCollection = evergreenDB.collection("review");
const reportCollection = evergreenDB.collection("report");
const wishlistCollection = evergreenDB.collection("wishlist");
const propertybroughtCollection = evergreenDB.collection("propertyBrought");
const paymentCollection = evergreenDB.collection("payments");



module.exports = {
    mongodbConnection,
    userCollection,
    propertyCollection,
    reviewCollection,
    reportCollection,
    wishlistCollection,
    propertybroughtCollection,
    paymentCollection
};
