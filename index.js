import express from "express";
import _ from "lodash";
import {
  homeContent,
  aboutContent,
  contactContent,
} from "./src/js/staticPost.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("dist"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

let posts = [];

app.get("/", (req, res) => {
  res.render("home", {
    staticPostTitle: "Home",
    staticPostContent: homeContent,
    posts: posts,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    staticPostTitle: "About",
    staticPostContent: aboutContent,
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    staticPostTitle: "Contact",
    staticPostContent: contactContent,
  });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.get("/posts", (req, res) => {
  res.render("post");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.inPostTitle,
    content: req.body.inPostContent,
  };

  posts.push(post);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
