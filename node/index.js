const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database:  'nodedb'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const createTable = `create table if not exists people(id int not null auto_increment, name varchar(255), primary key(id))`
const sql = `INSERT INTO people(name) values('Gabriel Stamato')`
const queryName = `select * from people`

connection.query(createTable)
connection.query(sql)

let name = ''

connection.query(queryName, function (error, results, fileds) {
  if (error) throw error

  name = results[0]
})

connection.end()

app.get('/', (req, res) => {
  res.send(`<h1>Full Cycle Rocks!</h1><br /> <h2>You're rock, ${name.name}`)
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})