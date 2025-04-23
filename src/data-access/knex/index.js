// // const knexConfig = require('./knexfile');
// // const knex = require('knex')(knexConfig.development);

// // module.exports = knex;

// const knexConfig = require('./knexfile');
// const knex = require('knex')(knexConfig.development);

// // Migration ishga tushirish
// async function runMigrations() {
//   try {
//     await knex.migrate.latest();
//     console.log('✅ Knex migrations successful');
//   } catch (err) {
//     console.error('❌ Migration error:', err);
//   }
// }

// runMigrations(); // bu app boshlanganida chaqiriladi

// module.exports = knex;

// **********************
const environment = process.env.NODE_ENV || 'development'
const knexConfig = require('./knexfile')
const knex = require('knex')(knexConfig[environment])

async function runMigrations() {
    try {
        await knex.migrate.latest()
        console.log('✅ Knex migrations successful')
    } catch (err) {
        console.error('❌ Migration error:', err)
    }
}

runMigrations() // run once when app starts

module.exports = knex
