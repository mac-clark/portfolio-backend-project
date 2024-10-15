// middleware/authMiddleware.js

const ensureAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        // If session exists, move to the next middleware or route handler
        return next();
    } else {
        // If not authenticated, return a 401 unauthorized error
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = ensureAuthenticated;
