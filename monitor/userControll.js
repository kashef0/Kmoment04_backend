const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// registera en ny admin
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Hasha lösenordet innan det sparas i databasen
        const hashedPassword = await bcrypt.hash(password, 10);
        // Skapa en ny användare med det hashade lösenordet
        const newUser = new User({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Logga in en admin
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // validering värde fån input
        if (!username || !password) {
            return res.status(400).json({error: "ogiltlig input, skicka användarnamn och lösenord"});
        }
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'ogiltlig username eller password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'ogiltlig username eller password' });

        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: "user logged in!", token: token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'username email');
        res.json(users);
    } catch (error) {
        console.error("error vid fetching" + error);
        res.status(500).json({error: "error fetching users" + error});
    }
};