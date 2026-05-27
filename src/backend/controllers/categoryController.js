const dbService = require("../services/dbService");

const list = (req, res) => {
  res.json(dbService.categories);
};

const getBySlug = (req, res) => {
  const slug = req.params.slug;
  const category = dbService.categories.find((item) => item.slug === slug);
  if (!category) {
    return res.status(404).json({ message: "Thể loại không tồn tại." });
  }
  const articles = dbService.articles.filter(
    (article) => article.category === category.name,
  );
  res.json({ category, articles });
};

module.exports = { list, getBySlug };
