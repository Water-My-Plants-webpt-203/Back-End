const db = require('../../data/db-config.js');

function findUsername(username){
    return db("users").select("username").where("username", username).first();
}

function findById(user_id){
    return db('users')
    .select("user_id","username","password","phoneNumber")
    .where("user_id", user_id).first();
}

async function insert(user) {
    const [user_id] = await db('users').insert(user, "user_id");
    return findById(user_id);
}

function updateById(user_id, user){
    return db('users').update(user).where({ user_id })
}

function findByUsername(username) {
    return db("users").select("user_id","username","password").where("username",username).first();
}

module.exports = {
    findById, findUsername, insert, updateById, findByUsername
}
