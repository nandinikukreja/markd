import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/User.js";

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

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
