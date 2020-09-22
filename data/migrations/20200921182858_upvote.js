
exports.up = async function(knex) {
  return knex.schema.createTable("upvote", (table) => {
      table.integer("users_id")
        .notNull()
        .references("id")
        .inTable("users")
      table.integer("issues_id")
        .notNull()
        .references("id")
        .inTable("issues")
        .onDelete("SET NULL")
      table.primary("users_id", "issues_id")
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTaleIfExists("upvote")
};
