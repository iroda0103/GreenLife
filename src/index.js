// const express = require('express')
// const router = require('./controllers')
// const config = require('./shared/config')
// // const { connect } = require('./data-access')
// const path = require('path')
// const cors = require('cors')

// require('../src/data-access/knex/index')

// const app = express()

// app.use('/uploads/', express.static(path.join(__dirname, '..', 'uploads')))
// app.use(cors())
// app.use(express.json())
// app.use(router)

// app.get('/', (req, res) => {
//     res.json({
//         message: 'Salom, dunyo!',
//     })
// })

// app.listen(config.port, () => {
//     console.log(`Server ${config.port}-portda ishlayapti`)
// })

// *********************************

const express = require('express')
const router = require('../src/controllers')
const config = require('../src/shared/config')
const path = require('path')
const cors = require('cors')
const { Pool } = require('pg')

// Connect to PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
})

// Optional: attach pool to app so controllers can access it
const app = express()
app.set('db', pool)

require('../src/data-access/knex') // Initialize Knex connection

// Middleware
app.use('/uploads/', express.static(path.join(__dirname, '..', 'uploads')))
app.use(cors())
app.use(express.json())

// Routes
app.use(router)

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()')
        res.json({
            message: 'Salom, dunyo!',
            time: result.rows[0],
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.listen(config.port, () => {
    console.log(`Server ${config.port}-portda ishlayapti`)
})

// Export as Vercel handler
module.exports = app
