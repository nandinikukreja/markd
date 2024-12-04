import express from "express";
import Article from "../models/Article.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET /api/articles
router.get("/", auth, async (req, res) => {
  try {
    const articles = await Article.find().populate("author", "name");
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /api/articles/:id
router.get("/:id", auth, async (req, res) => {
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

// POST /api/articles
router.post("/", auth, async (req, res) => {
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

// DELETE /api/article/:id

router.delete("/:id", auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
