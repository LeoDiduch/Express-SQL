const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "127.0.0.1", // adresse du serveur
  port: 3306,
  user: "root", // le nom d'utilisateur
  password: "******", // le mot de passe
  database: "ExpressQuest" // le nom de la base de données
});

module.exports = connection;
