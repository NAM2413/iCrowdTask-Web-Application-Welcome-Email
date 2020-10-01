const express = require("express")
const Data = require("./models/Data");
const bodyParser = require("body-parser")
const { request, response } = require("express");
const app = express()
const mongoose = require("mongoose")
const https = require("https")

mongoose.connect('mongodb://localhost:27017/iCrowdTaskDB', { useNewUrlParser: true, useUnifiedTopology: true });


app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/homepage.html")
})

app.post('/register', (req, res) => {
    const country = req.body.country
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const password = req.body.password
    const password2 = req.body.password2
    const email = req.body.email
    const address1 = req.body.address1
    const address2 = req.body.address2
    const state = req.body.state
    const city = req.body.city
    const code = req.body.code
    const phone = req.body.mobile
    const data = new Data({
        Country: country,
        Firstname: firstname,
        Lastname: lastname,
        password: password,
        password2: password2,
        email: email,
        Address1: address1,
        Address2: address2,
        State: state,
        City: city,
        PostalCode: code,
        Phone: phone
    })
    data
        .save()
        .catch((err) => console.log(err));

    if (res.statusCode === 200) {
        res.sendFile(__dirname + "/index.html")
    } else {
        res.sendFile(__dirname + "/error.html")
    }
    const dataMC = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname,
            }

        }]
    }
    jsonData = JSON.stringify(dataMC)
    const url = "https://us2.api.mailchimp.com/3.0/lists/038b9a59d8"

    const options = {
        method: "POST",
        auth: "nam:4af8c0d5f056187dfacea6bb372d7be7-us2"
    }
    const request1 = https.request(url, options, (response) => {
        response.on("data", (dataMC) => {

            console.log(JSON.parse(dataMC))
        })
    })

    request1.write(jsonData)
    request1.end()
    console.log(firstname, lastname, email)

})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, (req, res) => {
    console.log("Server is online ")
})
