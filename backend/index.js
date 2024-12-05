import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import articleRoutes from './routes/articles.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

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
  res.setHeader("Access-Control-Allow-Origin", `*`);
  res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});