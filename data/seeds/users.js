
exports.seed = async function(knex) {
  await knex("users").insert([
    {username:"Shannon", password: "hey123", department: "admin"},
    {username:"Timmy", password: "youabc", department: "student"}
  ])
};
