
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static('./public'))

// Tạo chỗ chứa file img
const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, './public/images')
    },
    filename: function (req,file,cb){
        cb(null, `${Date.now()}_${file.originalname}`);
    }
})

const upload = multer({storage})

//  Start Connect Database
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database: "travelnodejs"
})
//  End Connect Database

// Thông báo connect thành công 
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

// Lấy data từ Admin
 app.get('/Admin',(req,res) =>{
    const sql = "SELECT * FROM Admin";
    db.query(sql,(err,data) =>{
        if(err) return res.json(err);
        return res.json(data);
    })
 })

//  Lấy data từ Tour 
 app.get('/Tours',(req,res) =>{
    const sql = "SELECT * FROM Tours";
    db.query(sql,(err,data) =>{
        if(err) return res.json(err);
        return res.json(data);
    })
 })
//  Lấy data từ Customer 
app.get('/Customer',(req,res) =>{
    const sql = "SELECT * FROM Tours";
    db.query(sql,(err,data) =>{
        if(err) return res.json(err);
        return res.json(data);
    })
 })
//  import dữ liệu Tour từ form 
 app.post('/create',upload.single('file'),(req,res) =>{
    const sql = "INSERT INTO Tours(`title`,`image`,`description`,`price`,`startdate`,`enddate`) VALUES(?)";
    const values = [
        req.body.title,
        req.file.filename,
        req.body.description,
        req.body.price,
        req.body.startdate,
        req.body.enddate
    ]
    db.query(sql,[values],(err,data) =>{
        if(err) return res.json("err");
        return res.json(data);
    })
 })
//  import dữ liệu User từ form 
app.post('/createuser',(req,res) =>{
    const sql = "INSERT INTO Customer(`firstname`,`lastname`,`phone`,`email`,`destination`) VALUES(?)";
    const values = [
        req.body.firstname,
        req.body.lastname,
        req.body.phone,
        req.body.email,
        req.body.destination
    ]
    db.query(sql,[values],(err,data) =>{
        if(err) return res.json("err");
        return res.json(data);
    })
 })
//  Update data Tour 
 app.put('/update/:id',upload.single('file'),(req,res) =>{
    const sql = "UPDATE Tours set `title` = ?, `image` = ?, `description` = ?,  `price` = ?, `startdate` = ?, `enddate` = ? WHERE ID = ?" ;
    const values = [
        req.body.title,
        req.file.filename,
        req.body.description,
        req.body.price,
        req.body.startdate,
        req.body.enddate
    ]
    const id = req.params.id;
    db.query(sql,[...values,id],(err,data) =>{
        if(err) return res.json("err");
        return res.json(data);
    })
 })
// Delete Tour 
 app.delete('/delTours/:id',(req,res) =>{
    const sql = "DELETE FROM Tours WHERE ID = ?" ;
    const id = req.params.id;
    db.query(sql,[id],(err,data) =>{
        if(err) return res.json("err");
        return res.json(data);
    })
 })
app.listen(8081,() =>{
    console.log("Listening...");
})
