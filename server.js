import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import {dirname} from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

const connectionString =
  process.env.DATABASE_URL ||                           // on Render i’ll set this
  "postgres://postgres:b2463028496@localhost:5432/allLessons";  // local DB

const db = new pg.Client({
  connectionString,
  ssl: process.env.DATABASE_URL                          // only enable SSL when using DATABASE_URL
    ? { rejectUnauthorized: false }
    : false
});

db.connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("DB connection error", err));


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",async(req,res)=>{
    const label = req.query.label||"Python basics";
    const moduleId = parseInt(req.query.moduleId, 10) || 1;
    const result = await db.query("SELECT * FROM lessons ORDER by id ASC");
    const lessons = result.rows;
    let lessonSpecificModule = await db.query("Select * FROM lessons WHERE module_id=$1 ORDER BY id ASC",[moduleId]);
    lessonSpecificModule = lessonSpecificModule.rows;
    res.render("lessons.ejs",{lessons:lessons,moduleLessons:lessonSpecificModule,moduleId,label});
});

app.post("/select-module",async(req,res)=>{
    const moduleId = parseInt(req.body.moduleId, 10) || 1;
    const label = req.body.label;
    console.log(moduleId);
    res.redirect(`/?moduleId=${moduleId}&label=${label}`);
});

app.get("/select-lesson/:moduleId/:lessonId", async (req,res)=>{
    let id = req.params.lessonId-1;
    let module_id = req.params.moduleId;
    console.log(id);
    console.log(module_id)
    const result = await db.query("SELECT lesson_file from lessons WHERE module_id=$1 ORDER by id ASC",[module_id]);
    const fileName = result.rows;
    console.log(fileName);
    res.sendFile(__dirname + `/public/slides/module ${module_id}/${fileName[id].lesson_file}`,err=>{
        if(err){
            console.log("Couldn't sent the file");
        }
    });
});

app.get("/select-basic-points/:moduleId/:lessonId",async(req,res)=>{
    let moduleId = req.params.moduleId;
    let lessonId=req.params.lessonId;
    
    const slidesDir = __dirname + `/public/basic_points/module${moduleId}/lesson${lessonId}`;

    let files = await fs.readdir(slidesDir);
    console.log(files);

    const pngFiles = [];
    files.forEach((f)=>{
        if (/\.png$/i.test(f)) {
            pngFiles.push(f);
        }
    });

    // sort by digits in filename:
    pngFiles.sort((a, b) => {
        const na = parseInt(a.match(/(\d+)/)?.[1] || "0", 10);
        const nb = parseInt(b.match(/(\d+)/)?.[1] || "0", 10);
        return na - nb;
    });

    const slides = [];
    for (const f of pngFiles) {
        slides.push(`/basic_points/module${moduleId}/lesson${lessonId}/${f}`);
    }

    res.render("carousel-viewer.ejs", { slides });
});

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});