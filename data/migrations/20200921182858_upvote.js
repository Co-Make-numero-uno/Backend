
exports.up = async function(knex) {
  return knex.schema.createTable("upvote", (table) => {
      table.increments()

      table
        .integer("user_id")
        .notNull()
        .references("id")
        .inTable("users")
      table
        .integer("issue_id")
        .notNull()
        .references("id")
        .inTable("issues")
      table
        .boolean("vote")
        .defaultTo(0)
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("upvote")
};
