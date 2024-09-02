const express = require("express");
const path = require("path");

const multer = require("multer");

//Instance for uploding file into the uplode folder
const uplode = multer({ dest: "uplode/" });

const app = express();
const PORT = 7000;

//to store the file where we can view as our wish (Copy from multer NPM web)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uplode");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}- ${file.originalname}`);
  },
});

const uploade = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());

//To acept the form data
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.post("/uplode", uploade.single("profileImage"), (req, res) => {
  return res.redirect("/");
});

app.listen(7000, () => {
  console.log(`> Server started at: ${PORT}`);
});
