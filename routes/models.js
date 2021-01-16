const db = require("../data/config")

module.exports = {
    add,
    find,
    findBy,
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

function findBy(filter){
    return db("users")
        .select("username", "department")
        .where(filter)
}

function findByUsername(username){
    return db("users")
        .select("username")
        .where({username}, username)
}

function findByDepartment(department){
    return db("users")
        .select("department")
        .where("department", department)
}

function findById(id){
    return db("users")
        .select("id", "username", "department" )
        .where({id})
        .first()
}
