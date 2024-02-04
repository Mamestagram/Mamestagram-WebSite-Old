const mysql = require("mysql");
const pool = mysql.createPool({
    host: "localhost",
    user: "mames1basshhii0610",
    password: "mamestagrammames1passwordadmin",
    database: "MamestaServer",
    stringifyObjects: true
});
module.exports = pool;