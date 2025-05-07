import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    databse:"allLessons",
    password:"b2463028496",
    port:"5432"
});
db.connect();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



app.get("/",(req,res)=>{
    res.render("lessons.ejs");
});

app.post("/lesson:id",(req,res)=>{

});

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});