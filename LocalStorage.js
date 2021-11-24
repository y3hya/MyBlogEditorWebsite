var articleID = null;
var arrayOfArticles = [];

function saveArticle() {
  if (articleID == null) {
    var newArticleID = rndId("article");
  } else {
    newArticleID = articleID;
  }

  var articleTitle = document.querySelector("#MyArticle h1").textContent;
  var articleContent = document.querySelector("#MyArticle").innerHTML;

  var articleObject = {
    title: articleTitle,
    content: articleContent,
    id: newArticleID,
  };

  localStorage.setItem(newArticleID, JSON.stringify(articleObject));
  articlesArray(newArticleID, "push");
}

function getArticlesList() {
  var list = localStorage.getItem("Articles");
  if (list == null) {
    list = [];
  } else {
    list = JSON.parse(list);
  }
  arrayOfArticles = list;
}

function populateArticles() {
  getArticlesList();

  arrayOfArticles.forEach((key) => {
    var divElement = document.createElement("div");
    var articleDiv = ArticlesList.appendChild(divElement);

    articleNameToShow = JSON.parse(localStorage.getItem(key)).title;
    divElement.setAttribute("id", key);
    articleDiv.innerHTML = "<strong>" + articleNameToShow + "</strong>";
    articleDiv.onclick = () => openArticle(key);
  });
}

function openArticle(divArticleId) {
  var articleObject = localStorage.getItem(divArticleId);
  var articleObject = JSON.parse(articleObject);
  var articleContent = articleObject.content;
  ArticlesList.innerHTML = articleContent;
  header.parentElement.removeChild(header);
}

function articlesArray(articleId, x) {
  getArticlesList();
  if (x == "push") {
    console.log(arrayOfArticles);
    arrayOfArticles.push(articleId);
    console.log(arrayOfArticles);
  } else if (x == "splice") {
    arrayOfArticles.splice(arrayOfArticles.indexOf(articleId), 1);
  }

  var textArray = JSON.stringify(arrayOfArticles);
  localStorage.setItem("Articles", textArray);
}
