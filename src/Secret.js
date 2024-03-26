require('dotenv').config();

const PortNumber = process.env.PORT || 5000;
const access_jwt_token = process.env.ACCESS_TOKEN_SECRET;

//Database Connection URL
const databaseUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3il8g6r.mongodb.net/?retryWrites=true&w=majority`;
const stripe_secret_key = process.env.STRIPE_SECRET_KEY


module.exports = { PortNumber, databaseUrl, access_jwt_token, stripe_secret_key };