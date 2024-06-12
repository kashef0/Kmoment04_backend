const company = require('../models/company');

// hämta menu
exports.getCompany = async (req, res) => {
    try {
        const companies = await company.find();
        res.json(companies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// skapa en ny menu
exports.createCompany = async (req, res) => {
    try {
        const newCompany = new company(req.body);
        const savedCompany = await newCompany.save();
        res.json(savedCompany);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// radera en befintlig bokning
exports.deleteCompany= async (req, res) => {
    try {
        await company.findByIdAndDelete(req.params.id);
        res.json({ message: 'Jobb är raderad' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};