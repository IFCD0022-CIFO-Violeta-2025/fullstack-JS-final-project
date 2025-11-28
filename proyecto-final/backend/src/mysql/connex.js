// const mysql = redquire("mysql2/promise");
// const config = redquire("../config/config");
import mysql from "mysql2/promise";
import config from "../config/config";

const connection = mysql.createPool({
    host: config.db_host,
    user: config.db_user,
    database: config.db_database,
    port: config.db_port,
    password: config.db_password
});

async function testConnectionMySQL() {
    try {
        await connection.getConnection();
        console.log("Conexion a MySQL correcta!");
    } catch (error) {
        console.log(error); // error mysql server
    }
}

testConnectionMySQL();

module.exports = connection;