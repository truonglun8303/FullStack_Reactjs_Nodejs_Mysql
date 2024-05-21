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
    const sql = "ALTER TABLE Customer ADD COLUMN destination VARCHAR(255)";    
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });