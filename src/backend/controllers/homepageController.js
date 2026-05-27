const dbService = require("../services/dbService");

const homepage = (req, res) => {
  const featured = dbService.articles.filter((article) => article.featured);
  const latest = [...dbService.articles]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 8);
  const topStories =
    featured.length > 0 ? featured.slice(0, 5) : latest.slice(0, 5);

  res.json({
    featured,
    latest,
    topStories,
    categories: dbService.categories,
    videos: dbService.videos.slice(0, 4),
  });
};

module.exports = { homepage };
