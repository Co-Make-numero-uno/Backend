
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments();

        table
            .string('email', 255)
            .notNullable()
            .unique();
        table
            .string('password', 255)
            .notNullable();
        table
            .string('name', 255)
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
    return knex.schema.dropTableIfExists('users');
};
