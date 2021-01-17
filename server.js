const express = require("express")
const session = require("express-session")
const knexSessionStore = require("connect-session-knex")(session)
//const cookieParser = require("cookie-parser")


const routes = require("./routes/routes")
const dbConfig = require("./data/config")

const server = express()

server.use(express.json());
//server.use(cookieParser())
server.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "keep it secret",
    store: new knexSessionStore({
        knex: dbConfig,
        createtable: true
    })
}))
server.use('/api', routes )

module.exports = server;
