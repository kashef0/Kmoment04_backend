const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const companySchem = new Schema({              // Definierar ett schema för company
    company_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    job_title: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true
    },
    start_date: {
        type: String,
        required: true
    },
    end_date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }

});

module.exports = mongoose.model("company", companySchem);