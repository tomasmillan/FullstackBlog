const express = require("express");
const path = require("path");
const fileupload = require("express-fileupload");

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

app.get("/", (req, res) => {
  res.sendFile(path.join(initial_path, "index.html"));
});

app.get("/editor", express.static("uploads"), (req, res) => {
  res.sendFile(path.join(initial_path, "editor.html"));
});

// upload link
app.post("/upload", (req, res) => {
  let file = req.files.image;
  let date = new Date();
  // image name
  let imagename = date.getDate() + date.getTime() + file.name;
  // image upload path
  let path = "public/uploads/" + imagename;

  // create upload
  file.mv(path, (err, result) => {
    if (err) {
      throw err;
    } else {
      // our image upload path
      res.json(`uploads/${imagename}`);
    }
  });
});

app.get("/blogs", (req, res) => {
  res.sendFile(path.join(initial_path, "blog.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(initial_path, "contact.html"));
});

app.get("/catalog", (req, res) => {
  res.sendFile(path.join(initial_path, "catalog.html"));
});

app.get("/:id", (req, res) => {
  res.sendFile(path.join(initial_path, "blogView.html"));
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
