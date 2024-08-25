const jwt = require('jsonwebtoken');

function checkAuthenticated(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Failed to authenticate token" });
        }
        
        req.user = decoded;
        next();
    });
}

function checkAdmin(req, res, next) {
    const token = req.cookies.token;


    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Access denied. Admins only.' });
            }
            req.user = decoded;
            if (req.user && req.user.isAdmin) {
                next();
            } else {
                res.status(403).json({ message: 'Access denied. Admins only.' });
            }
        });
    } else {
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
}

module.exports = {
    checkAdmin,
    checkAuthenticated
};
