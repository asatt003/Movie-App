/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("movies", function (table) {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.boolean("addedByUser").notNullable();
        table.boolean("watched").notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("movies");
};
