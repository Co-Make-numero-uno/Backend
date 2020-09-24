
exports.up = function(knex) {
    return knex.schema.createTable('users1', table => {
        table.increments();

        table
            .string('email1', 255)
            .notNullable()
            .unique();
        table
            .string('password1', 255)
            .notNullable();
        table
            .string('name1', 255)
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
    return knex.schema.dropTableIfExists('users1');
};

