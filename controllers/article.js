const con = require("../utils/db");

const getAllArticles = (req, res) => {
  let query = "SELECT * FROM article";
  let articles = [];
  con.query(query, (err, result) => {
    if (err) throw err;
    articles = result;
    res.render("index", {
      title: "Homepage",
      articles: articles,
    });
  });
};

const getArticleBySlug = (req, res) => {
  let query = `SELECT * FROM article WHERE slug="${req.params.slug}"`;
  con.query(query, (err, result) => {
    if (err) throw err;
    let article = result;
    con.query(
      `SELECT * FROM author WHERE id = ?`,
      [article[0].author_id],
      (err, aresult) => {
        if (err) throw err;
        let author = aresult[0];
        article[0].author = author;
        res.render("article", {
          article: article,
        });
      }
    );
  });
};

module.exports = {
  getAllArticles,
  getArticleBySlug,
};
