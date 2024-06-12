const jwt = require("jsonwebtoken");

// Funktion för att verifiera JWT
module.exports = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(token == null) {
        res.status(401).json({message: "Not authorized for this token missing!"});
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) {
            return res.status(403).json({message: "not correct jwt"});
        }
        req.username = username;
        next();
    })
};