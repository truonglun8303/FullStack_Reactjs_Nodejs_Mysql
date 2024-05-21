var mysql = require('mysql');

var db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database: "travelnodejs"
});


// db.connect(function(err) {
//   if (err) throw err;
//   var sql = "DROP TABLE Tours";
//   db.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table deleted");
//   });
// });


db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "   CREATE TABLE Tours (ID INT AUTO_INCREMENT PRIMARY KEY,title VARCHAR(255), image VARCHAR(255),description VARCHAR(255),price int, startdate VARCHAR(50), enddate VARCHAR(50))";
  var sql = "  CREATE TABLE Admin (ID INT AUTO_INCREMENT PRIMARY KEY,user VARCHAR(255), password VARCHAR(255))";
  var sql = " CREATE TABLE Category (ID INT AUTO_INCREMENT PRIMARY KEY,Loai VARCHAR(255))";
  var sql = "CREATE TABLE Customer (ID INT AUTO_INCREMENT PRIMARY KEY,firstname VARCHAR(255), lastname VARCHAR(255),phone VARCHAR(255),email VARCHAR(255))";
  
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});


