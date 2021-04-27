const db = require('../../data/db-config.js');

function findById(plant_id){
    return db("plants")
    .select("plant_id", "nickname","species","h2oFrequency","image","user_id")
    .where("plant_id", plant_id).first();
}

function findByUserId(user_id){
    return db("plants")
    .select("plant_id", "nickname","species","h2oFrequency","image","user_id")
    .where("user_id", user_id);
}

async function insert(user_id, plant){
    plant.user_id = user_id;
    const [plant_id] = await db("plants").insert(plant, "plant_id");
    return findById(plant_id);
}

function updateById(plant_id, plant){
    return db("plants").update(plant).where({ plant_id })
}

function remove(plant_id){
    return db("plants").where("plant_id", plant_id).del();
}

module.exports = {
    findById, findByUserId, insert, updateById, remove
}