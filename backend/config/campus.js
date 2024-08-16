const mysql = require('mysql')

const db = mysql.createConnection({
    host: '127.0.0.2',
    port: 3066,
    user: "root", 
    password: "password", 
    database: "campus"
})

//handle error apabila gagal
db.connect((err) => {
    if(err) {
        console.error('failed to connecting database ', err.stack)
        return
    }
})

module.exports = db