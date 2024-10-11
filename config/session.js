// config/session.js
const session = require('express-session');

const sessionConfig = session({
    secret: process.env.SESSION_SECRET,  // Load the secret key from the environment variable
    resave: false,  // Don't save the session if unmodified
    saveUninitialized: false,  // Don't create a session until something is stored
    cookie: {
        secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production (requires HTTPS)
        maxAge: 1000 * 60 * 60 * 24,  // 1 day expiration
    },
});

module.exports = sessionConfig;
