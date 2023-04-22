import express from "express";
import * as dotenv from "dotenv";
import _ from "lodash";
import {
  homeContent,
  aboutContent,
  contactContent,
} from "./src/js/staticPost.js";
import mongoose from "mongoose";

dotenv.config();

mongoose.set("strictQuery", false);

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("dist"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

//create schema
const postSchema = {
  title: String,
  content: String,
};

//create model for schema
const Post = mongoose.model("Post", postSchema);

let posts = [];

function blogList() {
  return Post.find({})
    .then((postResults) => {
      // throw Error("this is a created error")
      // console.log(postResults);
      return postResults;
    })
    .catch((err) => {
      console.log(err);
    });
}

blogList();

app.get("/", (req, res) => {
  blogList().then((postResults) => {
    const getIds = postResults.forEach((post) => {
      // console.log(post._id);
    });

    // console.log(getIds);

    posts = postResults;
    res.render("home", {
      _: _,
      staticPostTitle: "Home",
      staticPostContent: homeContent,
      posts: posts,
    });
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

app.get("/posts/:postId", (req, res) => {
  const postId = req.params.postId;
  // console.log(postId);
  Post.findOne({ _id: postId }).then((post) => {
    // console.log(post);
    res.render("post", {
      _: _,
      postTitle: post.title,
      postContent: post.content,
    });
  });
});

app.post("/compose", (req, res) => {
  const blogPosts = new Post({
    title: req.body.inPostTitle,
    content: req.body.inPostContent,
  });

  blogPosts.save();

  res.redirect("/");
});

app.get("/delete/:postId", (req, res) => {
  const postId = req.params.postId;
  // console.log(postId);
  Post.findByIdAndRemove({ _id: postId })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server started on ${port}`);
  });
});
