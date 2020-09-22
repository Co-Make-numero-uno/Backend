
exports.seed = async function(knex) {
  await knex("users").insert([
    {"name":"Hedvig Mouland","city":"Macon","state":"GA","email":"hmouland0@surveymonkey.com","password":"tXAcnTQmRzwD"},
    {"name":"Andrew Chetham","city":"Houston","state":"TX","email":"achetham1@topsy.com","password":"Ium4yYpP5e"},
    {"name":"Coleman Raistrick","city":"Crawfordsville","state":"IN","email":"craistrick2@answers.com","password":"xNRZn5Zlb"},
    {"name":"Kirbie Reddel","city":"Albany","state":"NY","email":"kreddel3@nifty.com","password":"s9I6346lRO"}
  ])
};
