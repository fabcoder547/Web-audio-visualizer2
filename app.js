const express = require("express");
const ejs = require("ejs");
const app = express();
const cors = require("cors");
const addFileRoutes = require("./routes/addfile");
const multer = require("multer");
app.set("view engine", "ejs");

const path = require("path");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/audio");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
}).single("audiofile");

app.post("/api/upload", (req, res) => {
  console.log("welcome");
  console.log(upload);
  upload(req, res, (error) => {
    if (error) {
      res.render("index");
      console.log(error);
    } else if (req.file === undefined) {
      res.render("index");
    } else {
      console.log(`myuploads/${req.file.filename} else`);

      res.render("index", {
        messege: "File uploaded",
        filename: `/audio/${req.file.filename}`,
      });
    }
  });
});

app.use(express.static(__dirname + "/public"));

app.use(cors());
app.get("/", (req, res) => {
  res.render("index");
});
// app.use('/api', addFileRoutes);

app.get("/test", (req, res) => {
  res.render("test");
});
app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
