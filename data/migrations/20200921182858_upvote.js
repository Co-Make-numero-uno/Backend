
exports.up = async function(knex) {
  return knex.schema.createTable("upvote", (table) => {
      table.increments();
  })
};

exports.down = async function(knex) {
  
};
