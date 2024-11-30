import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import Article from "./models/Article.js";
import auth from "./middleware/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8081;

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to the server:", err);
  });

app.use(express.json());
app.use("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use(cors());

app.get("/api", (req, res) => {
  res.send("Hello World from the Server");
});

app.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send(user).status(201);
  } catch (err) {
    res.send(err).status(400);
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users).status(200);
  } catch (err) {
    res.send(err).status(500);
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrpyt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, userAgent: req.headers["user-agent"], ip: req.ip },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m",
      }
    );
    res.status(200).json({ message: "Login Successful", token, userId: user._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/dashboard", auth, (req, res) => {
  res.status(200).json({ message: "Dashboard", user: req.user });
});

app.get("/api/verify-token", auth, (req, res) => {
  res.status(200).json({ valid: true, user: req.user });
});

app.post("/api/articles", auth, async (req, res) => {
  try {
    const article = new Article({
      ...req.body,
      author: req.user.userId,
    });
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/api/articles", auth, async (req, res) => {
  try {
    const articles = await Article.find().populate("author", "name");
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/api/articles/:id", auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "author",
      "name"
    );
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/api/users/:id", auth, async (req, res) => {
  try {
    const userId = req.params.Id;
    const user = await User.findById(userId).select("-password");
    if(!user) return res.status(404).json({message: "User not found"});

    const articles = await Article.find({author: userId}).populate("author", "name");

    res.status(200).json({user, articles});
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put("/api/users/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;

    if(userId != req.user.userId)
      return res.status(401).json({message: "Unauthorized"});
    
    const {name, bio} = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {name, bio},
      {new: true, runValidators: true}
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
})

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
