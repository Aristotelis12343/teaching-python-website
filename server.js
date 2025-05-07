import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import {dirname} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"allLessons",
    password:"b2463028496",
    port:"5432"
});

db.connect();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",async(req,res)=>{
    const result = await db.query("SELECT * FROM lessons ORDER by id ASC");
    const lessons = result.rows;
    res.render("lessons.ejs",{lessons:lessons,module_id:lessons[0].module_id});
});

app.post("/select-lesson", async (req,res)=>{
    let id = parseInt(req.body.lessonId)-1;
    console.log(id);
    const result = await db.query("SELECT lesson_file from lessons ORDER by id ASC");
    const fileName = result.rows;
    console.log(fileName);
    res.sendFile(__dirname + `/public/slides/${fileName[id].lesson_file}`,err=>{
        if(err){
            console.log("Couldn't sent the file");
        }
    });
});

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});