const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "127.0.0.1", // adresse du serveur
  port: 3306,
  user: "root", // le nom d'utilisateur
  password: "jecodemysql", // le mot de passe
  database: "express_sql_quest" // le nom de la base de données
});

module.exports = connection;
