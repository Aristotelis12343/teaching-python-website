import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import {dirname} from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

// ─── LESSONS DATABASE ───────────────────────────────────────────────────────────
const lessonsConn = process.env.DATABASE_URL ||
                     "postgres://postgres:b2463028496@localhost:5432/allLessons";
const lessonsDb = new pg.Client({
  connectionString: lessonsConn,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// ─── AUTHENTICATION DATABASE ───────────────────────────────────────────────────
const authConn = process.env.AUTH_DATABASE_URL ||
                 "postgres://postgres:b2463028496@localhost:5432/usersPassword";
const authDb = new pg.Client({
  connectionString: authConn,
  ssl: process.env.AUTH_DATABASE_URL ? { rejectUnauthorized: false } : false
});

// connect both
Promise.all([ lessonsDb.connect(), authDb.connect() ])
  .then(() => console.log("Both databases connected"))
  .catch(err => console.error("DB connection error", err));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/lessonPage",async(req,res)=>{
    const label = req.query.label||"Python basics";
    const moduleId = parseInt(req.query.moduleId, 10) || 1;
    const result = await lessonsDb.query("SELECT * FROM lessons ORDER by id ASC");
    const lessons = result.rows;
    let lessonSpecificModule = await lessonsDb.query("Select * FROM lessons WHERE module_id=$1 ORDER BY id ASC",[moduleId]);
    lessonSpecificModule = lessonSpecificModule.rows;
    res.render("lessons.ejs",{lessons:lessons,moduleLessons:lessonSpecificModule,moduleId,label});
});

app.post("/select-module",async(req,res)=>{
    const moduleId = parseInt(req.body.moduleId, 10) || 1;
    const label = req.body.label;
    console.log(moduleId);
    res.redirect(`/lessonPage?moduleId=${moduleId}&label=${label}`);
});

app.get("/select-lesson/:moduleId/:lessonId", async (req,res)=>{
    let id = req.params.lessonId-1;
    let module_id = req.params.moduleId;
    console.log(id);
    console.log(module_id)
    const result = await lessonsDb.query("SELECT lesson_file from lessons WHERE module_id=$1 ORDER by id ASC",[module_id]);
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

app.get("/",(req,res)=>{
    res.render("home.ejs");
});

app.get("/register",(req,res)=>{
    res.render("register.ejs");
});

app.get("/login",(req,res)=>{
    res.render("login.ejs");
});

app.post("/register", async (req, res) => {
  const password = req.body.password;
  const username = req.body.displayName;
  try{
    const checkResult = await authDb.query("SELECT * FROM users WHERE username=$1",[username]);
    if (checkResult.rows.length>0){
        res.send("Name already exists. Try logging in.");
    }else{
        const result = await authDb.query("INSERT INTO users (username,password) VALUES ($1,$2)",[username,password]);
        console.log(result);
        res.render("lessons.ejs");
    }
    }catch(err){
        console.log(err);
    }
});

app.post("/login", async (req, res) => {
  const password = req.body.password;
  const username = req.body.displayName;
  try {
    const result = await authDb.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;

      if (password === storedPassword) {
        res.render("lessons.ejs");
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});