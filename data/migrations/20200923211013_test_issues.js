
exports.up = function(knex) {
    return knex.schema.createTable('issues1', table => {
        table.increments();

        table
            .string('title1', 255)
            .notNullable();
        table
            .string('description1', 255)
            .notNullable();
        table
            .string('city1', 255)
            .notNullable();
        table
            .string('state1', 2)
            .notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('issues1');
};
