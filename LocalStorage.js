var articleID = null;
var arrayOfArticles = [];

function showSaveButton() {
  if (hasH1()) {
    document.getElementById("saveButton").style.display = null;
  } else {
    document.getElementById("saveButton").style.display = "none";
  }
}
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
  articlesArray(articleTitle, "push");
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
  arrayOfArticles.forEach((i) => {
    var divElement = document.createElement("div");
    divElement.setAttribute("id", "abc");
    var articleDiv = ArticlesList.appendChild(divElement)
    articleDiv.innerHTML =
      "<strong>" + i + "</strong>";
      articleDiv.onclick = () => openArticle()

  });
}

function openArticle() {
  articleID = "articled8c225322d618";
  var articleObject = localStorage.getItem(articleID);
  articleObject = JSON.parse(articleObject);
  MyArticle.innerHTML = articleObject.content;
  showSaveButton();
}

function articlesArray(articleTitle, x) {
  if (x == "push") {
    arrayOfArticles.push(articleTitle);
  } else if (x == "splice") {
    arrayOfArticles.splice(arrayOfArticles.indexOf(articleTitle), 1);
  }

  console.log(x);

  var textArray = JSON.stringify(arrayOfArticles);
  console.log(textArray);
  localStorage.setItem("Articles", textArray);
}

getArticlesList();
populateArticles();
