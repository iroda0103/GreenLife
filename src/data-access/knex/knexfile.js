// Update with your config settings.
const config = require('../../shared/config')

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'greenlife',
      user:    'iroda',
      // password: config.db.password.toString(),
      password:'iroda0105',
      port: config.db.port,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
       directory: 'migrations'
    }
  },

  test: {
    client: 'postgresql',
    connection: {
      database: config.db.name,
      user:    config.db.user,
      // password: config.db.password.toString(),
      password:'iroda0105',
      port: config.db.port,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
       directory: 'migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: config.db.name,
      user:    config.db.user,
      // password: config.db.password.toString(),
      password:'iroda0105',
      port: config.db.port,
      ssl: { rejectUnauthorized: false }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'migrations'
    }
  }

};
// // Update with your config settings.
// import env from "./../environment/_env_module.js";
// env("../");
// env();

// console.log(process.env.DATABASE_URL);
// /**
//  * @type { Object.<string, import("knex").Knex.Config> }
//  */
// module.exports= {
//   development: {
//     client: "pg",
//     connection: {
//       connectionString: config.db.DATABASE_URL,
//       // connectionString: "postgres://postgres:4488@localhost:5432/postgres",
//       ssl: { rejectUnauthorized: false },
//     },
//     migrations: { directory: './migrations' },
//     seeds: { directory: './seeds/' },
//     pool: { min: 0, max: 7 },
//   },
//   test: {
//     client: "pg",
//     connection: {
//       connectionString: config.db.DATABASE_URL,
//       // connectionString: "postgres://postgres:4488@localhost:5432/postgres",
//       ssl: { rejectUnauthorized: false },
//     },
//     migrations: { directory: './migrations' },
//     seeds: { directory: './seeds/' },
//     pool: { min: 0, max: 7 },
//   },
//   production: {
//     client: "pg",
//     connection: {
//       connectionString: config.db.DATABASE_URL,
//       // connectionString: "postgres://postgres:4488@localhost:5432/postgres",
//       ssl: { rejectUnauthorized: false },
//     },
//     migrations: { directory: './migrations' },
//     seeds: { directory: './seeds/' },
//     pool: { min: 0, max: 7 },
//   },
// };
