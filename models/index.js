'use strict'

var firebase = require("firebase-admin");
var serviceAccount = require("../config/firebase.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://platzioverflow-5c28d.firebaseio.com"
});

const db = firebase.database();
const users = require('./users')

module.exports = {
    users: new users(db)
}

