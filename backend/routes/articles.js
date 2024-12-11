import express from "express";
import Article from "../models/Article.js";
import auth from "../middleware/auth.js";
import sanitizeHtml from "sanitize-html";

const router = express.Router();

const sanitizeOptions = {
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    "h1",
    "h2",
    "h3",
    "pre",
    "code",
    "span",
  ],
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    "*": ["style", "class"],
    code: ["class"],
    pre: ["class"],
    span: ["class"],
  },
  allowedStyles: {
    "*": {
      color: [
        /^#(0x)?[0-9a-f]+$/i,
        /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
      ],
      "font-family": [/.*/],
      "font-size": [/.*/],
      "font-weight": [/.*/],
      "text-align": [/.*/],
      "text-decoration": [/.*/],
      "background-color": [/.*/],
    },
  },
};

// GET /api/articles
router.get("/", auth, async (req, res) => {
  try {
    const sortOption = req.query.sort;
    let sortCriteria = { createdAt: -1 };
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    if (sortOption === "most-upvotes") {
      sortCriteria = { upvotes: -1 };
    }

    const articles = await Article.find()
      .populate("author", "name")
      .sort(sortCriteria)
      .skip(limit * (page - 1))
      .limit(limit);
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
    const sanitizedContent = sanitizeHtml(req.body.content, sanitizeOptions);

    const article = new Article({
      ...req.body,
      content: sanitizedContent,
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

    if (article.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/articles/:id

router.put("/:id", auth, async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const sanitizedContent = sanitizeHtml(req.body.content, sanitizeOptions);

    article.title = req.body.title || article.title;
    article.content = sanitizedContent || article.content;
    article.tags = req.body.tags || article.tags;

    await article.save();
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/articles/:id/upvote

router.put("/:id/upvote", auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    article.upvotes += 1;
    await article.save();
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
