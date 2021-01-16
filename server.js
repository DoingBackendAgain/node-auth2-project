const express = require("express")
const session = require("express-session")
const knexSessionStore = require("connect-session-knex")(session)


//const router = require("")
const dbConfig = require("./data/config")

const server = express()

server.use(express.json());
server.use(session({
    resave: false,
    saveUninitialized: false,
    //secret: "keep it secret",
    store: new knexSessionStore({
        //knex: 
        createtable: true
    })
}))
//server.use('/api', )

module.exports = server;
