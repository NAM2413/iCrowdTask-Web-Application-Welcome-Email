const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")

const dataSchema = new mongoose.Schema({

    Country: String,
    Firstname: String,
    Lastname: String,
    password2: String,
    Address1: String,
    Address2: String,
    City: String,
    State: String,
    PostalCode: String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Incorrect Email')
            }
        }
    },
      
    Phone: {
        type: String,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Incorrect Phone Number')
                
            }
        },
    },
    password: {
        type: String,
        required: true,
        validate(value) {
           
            if (!validator.equals(value,this.password2)) {
                throw new Error("Not the same passwords")
            }

            if (value.length < 8) {
                throw new Error("Too short passwords. ( Minimum 8 characters )")
            }
        }
    },
})
const Data = mongoose.model("Data", dataSchema)
module.exports = Data
