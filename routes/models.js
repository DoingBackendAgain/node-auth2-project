const db = require("../data/config")

module.exports = {
    add,
    find,
    findByUsername,
    findByDepartment,
    findById
}

async function add(user){
    const [id] = await db('users')
        .insert(user)
        return findById(id)
}

function find(){
    return db("users")
        .select("id", "username", "department")
}

function findByUsername(username){
    return db("users")
        .select("username")
}

function findByDepartment(department){
    return db("users")
        .select("department")
}

function findById(id){
    return db("users")
        .select("id", "username", "department" )
        .where({id})
        .first()
}
