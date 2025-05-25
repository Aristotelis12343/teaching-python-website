import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import {dirname} from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

// ─── SSL CONFIG ────────────────────────────────────────────────────────────────
const useSsl = Boolean(process.env.DATABASE_URL || process.env.AUTH_DATABASE_URL);
const sslOptions = useSsl
  ? { rejectUnauthorized: false }
  : false;

// ─── LESSONS DATABASE ───────────────────────────────────────────────────────────
const lessonsConn = process.env.DATABASE_URL ||
                     "postgres://postgres:b2463028496@localhost:5432/allLessons";
const lessonsDb = new pg.Client({
  connectionString: lessonsConn,
  ssl: sslOptions
});

// ─── AUTHENTICATION DATABASE ───────────────────────────────────────────────────
const authConn = process.env.AUTH_DATABASE_URL ||
                 "postgres://postgres:b2463028496@localhost:5432/usersPassword";
const authDb = new pg.Client({
  connectionString: authConn,
  ssl: sslOptions
});


// connect both
Promise.all([ lessonsDb.connect(), authDb.connect() ])
  .then(() => console.log("Both databases connected"))
  .catch(err => console.error("DB connection error", err));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/lessonPage",async(req,res)=>{
    const name = req.query.displayName;
    const label = req.query.label||"Python basics";
    const moduleId = parseInt(req.query.moduleId, 10) || 1;
    const result = await lessonsDb.query("SELECT * FROM lessons ORDER by id ASC");
    const lessons = result.rows;
    let lessonSpecificModule = await lessonsDb.query("Select * FROM lessons WHERE module_id=$1 ORDER BY id ASC",[moduleId]);
    lessonSpecificModule = lessonSpecificModule.rows;

    const result1 = await lessonsDb.query("SELECT * FROM exercises ORDER by id ASC");
    const exercises = result1.rows;
    res.render("lessons.ejs",{lessons:lessons,moduleLessons:lessonSpecificModule,moduleId,label,name,exercises});
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

app.get("/get-exercise/:moduleId/:lessonId/:exerciseId",async (req,res)=>{
  const moduleId = req.params.moduleId;
  const lessonId = req.params.lessonId;
  const exerciseId = req.params.exerciseId;
  const result = await lessonsDb.query("Select * FROM exercises WHERE lesson_id=$1 and module_id=$2 and id=$3 ORDER by id ASC",[lessonId,moduleId,exerciseId]);
  const exercise = result.rows;
  console.log(exercise);
  res.render("exercise.ejs",{exercise:exercise[0]});
});

app.get("/show-edit-page",(req,res)=>{
  const PreviousName = req.query.name;
  res.render("edit.ejs",{PreviousName});
});

app.post("/edit-name",async(req,res)=>{
  const newName = req.body.displayName;
  const PreviousName = req.body.PreviousName;
  await authDb.query("UPDATE users SET username=$1 WHERE username=$2",[newName,PreviousName]);
  res.redirect(`/lessonPage/?displayName=${newName}`);

});

app.get("/show-password-page",(req,res)=>{
  const name = req.query.name;
  res.render("password.ejs",{name});
});

app.post("/edit-password",async(req,res)=>{
  const name = req.body.CurrentName;
  const password = req.body.displayPassword;
  console.log(name);
  await authDb.query("UPDATE users SET password=$1 WHERE username=$2",[password,name]);
  res.redirect("/login");

});

app.get("/show-delete-page",(req,res)=>{
  const name = req.query.name;
  res.render("delete.ejs",{name});
});

app.post("/delete-account",async(req,res)=>{
  const name = req.body.username;
  await authDb.query("DELETE FROM users WHERE username=$1",[name]);
  res.redirect("/");
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
  try {
    const checkResult = await authDb.query(
      "SELECT * FROM users WHERE username=$1",
      [username]
    );
    if (checkResult.rows.length > 0) {
      return res.send(`
        <script>
          alert("Name already exists. Try logging in.");
          window.location = "/register";
        </script>
      `);
    } else {
      await authDb.query(
        "INSERT INTO users (username,password) VALUES ($1,$2)",
        [username, password]
      );
      return res.render("enter_course_register.ejs",{displayName:username});
    }
  } catch (err) {
    console.error(err);
    return res.send(`
      <script>
        alert("Server error. Please try again.");
        window.location = "/register";
      </script>
    `);
  }
});

app.post("/login", async (req, res) => {
  const password = req.body.password;
  const username = req.body.displayName;
  try {
    const result = await authDb.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;

      if (password === storedPassword) {
  
        return res.render("enter_course_login.ejs",{displayName:username});
      } else {
        return res.send(`
          <script>
            alert("Incorrect password.");
            window.location = "/login";
          </script>
        `);
      }
    } else {
      return res.send(`
        <script>
          alert("User not found.");
          window.location = "/login";
        </script>
      `);
    }
  } catch (err) {
    console.error(err);
    return res.send(`
      <script>
        alert("Server error. Please try again.");
        window.location = "/login";
      </script>
    `);
  }
});


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});