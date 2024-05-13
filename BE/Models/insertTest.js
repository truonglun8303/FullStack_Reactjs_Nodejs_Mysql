var mysql = require('mysql');

var db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database: "travelnodejs"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO Admin (user, password) VALUES ('Admin', '123')";
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });