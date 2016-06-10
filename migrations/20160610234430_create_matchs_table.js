exports.up = function(knex, Promise) {
    return knex.schema.createTable('matches', function(table) {
        table.increments('id').primary();
        table.integer('fixture_id');
        table.string('homeTeamName');
        table.string('awayTeamName');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('matches');
};