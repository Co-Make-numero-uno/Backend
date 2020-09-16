
exports.up = function(knex) {
    return knex.schema.createTable('issues', table => {
        table.increments();

        table
            .string('title', 255)
            .notNullable();
        table
            .string('description', 255)
            .notNullable();
        table
            .string('city', 255)
            .notNullable();
        table
            .string('state', 2)
            .notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('issues');
};
