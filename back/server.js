const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
const port = 5000;


app.use(cors())
// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true})); // New
// Parse application/json
app.use(express.json()); // New

// MySQL Code goes here
const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'db_arbres'
})

// Get db_arbres

app.get('/arrondissement', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT ARRONDISSEMENT, COUNT(*) AS nbARBRE FROM sheet WHERE ARRONDISSEMENT LIKE "%PARIS%" GROUP BY ARRONDISSEMENT ORDER BY ARRONDISSEMENT  ;', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from arbres table are: \n', rows)
        })
    })
})


app.get('/arbre', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT GENRE, COUNT(*) AS nbARBRE FROM sheet GROUP BY GENRE ORDER BY GENRE;', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from arbres table are: \n', rows)
        })
    })
})

// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listening on port ${port}`))