//require("dotenv").config() this goes here or in json

const server = require("./server")

const PORT = process.env.PORT || 1000;

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});