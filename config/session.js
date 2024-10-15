// config/session.js
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Load the MongoDB URI and secret from environment variables
const sessionConfig = session({
    secret: process.env.SESSION_SECRET,  // Load the secret key from the environment variable
    resave: false,  // Don't save the session if unmodified
    saveUninitialized: false,  // Don't create a session until something is stored
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGO_URI, // Store sessions in MongoDB
        collectionName: 'sessions',
        ttl: 24 * 60 * 60  // 1 day expiration (TTL for the session in seconds)
    }),
    cookie: {
        httpOnly: true,  // Prevent client-side access to the cookie
        secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production (requires HTTPS)
        maxAge: 1000 * 60 * 60 * 24,  // 1 day expiration
    },
});

module.exports = sessionConfig;
