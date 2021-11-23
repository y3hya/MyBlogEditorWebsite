document.getElementById("insertButton").onclick = OnInsertClick;
document.getElementById("deleteButton").onclick = deleteElement;
var pickedID = null;

function OnInsertClick() {
  var selected = document.getElementById("optionSelect").value;
  var myText = document.getElementById("textArea").value;

  if (selected == "") {
    alert("Please select an Option");
    return;
  }
  if (myText == "") {
    alert("Text area can not be empty!");
    return;
  }
  if (selected == "title-heading") {
    addHeading(myText);
  }
  if (selected == "secondary-heading") {
    addSecondaryHeading(myText);
  }

  if (selected == "normal-text") {
    addParagraph(myText);
  }
  if (selected == "attach-an-image") {
    addImage(myText);
  }
  if (selected == "attach-a-video") {
    addVideo(myText);
  }

  // after complete process clear text area

  convertToInsertMode();
}

function rndId(elementName) {
  var i = Math.random().toString(16).slice(2);
  return elementName + i;
}

function addHeading(myText) {
  if (document.querySelector("#MyArticle h1") == null) {
    var elementName = "h1";
    var elementAttribute = "textContent";

    var newElement = makePickableElement(elementName, myText, elementAttribute);
    MyArticle.prepend(newElement); // Append the H1 element to text-Area
  } else {
    document.querySelector("#MyArticle h1").textContent = textArea.value;
  }
}
// -----------------------2nd-HEADING----------------------- //
function addSecondaryHeading(myText) {
  if (pickedID == null) {
    var elementName = "h2";
    var elementAttribute = "innerHTML";

    var newElement = makePickableElement(elementName, myText, elementAttribute);
    MyArticle.appendChild(newElement); // Append the H1 element to text-Area
  } else {
    document.getElementById(pickedID).innerHTML = textArea.value;
  }
}

// ------------------------PARAGRAPH----------------------- //
function addParagraph(myText) {
  if (pickedID == null) {
    var elementName = "p";
    var elementAttribute = "innerHTML";

    myText = myText.replace(/\n+/g, "<br><br>");
    var newElement = makePickableElement(elementName, myText, elementAttribute);
    MyArticle.appendChild(newElement); // Append the H1 element to text-Area
  } else {
    document.getElementById(pickedID).innerHTML = textArea.value.replace(/\n+/g, "<br><br>");
  }
}

function addImage(myText) {
  if (pickedID == null) {
    var divElement = document.createElement("div");
    divElement.setAttribute("class", "flex-center");

    var elementName = "img";
    var elementAttribute = "src";

    var newElement = makePickableElement(elementName, myText, elementAttribute);

    divElement.appendChild(newElement);
    MyArticle.appendChild(divElement);
  } else {
    document.getElementById(pickedID).src = textArea.value;
  }
}

function addVideo(myText) {
  if (!myText.includes("/watch?v=")) {
    return alert("Bad youtube url");
  }
  if (pickedID == null) {
    var divElement = document.createElement("div");
    divElement.setAttribute("class", "flex-center");
    myText = myText.replace("/watch?v=", "/embed/");

    var elementName = "iframe";
    var elementAttribute = "src";

    var newElement = makePickableElement(elementName, myText, elementAttribute);

    newElement.setAttribute("frameborder", "0");
    newElement.setAttribute("class", "videoAttach");

    divElement.appendChild(newElement);
    MyArticle.appendChild(divElement); // Append the H1 element to text-Area
  } else {
    document.getElementById(pickedID).src = textArea.value.replace(
      "/watch?v=",
      "/embed/"
    );
  }
}

function makePickableElement(elementName, myText, elementAttribute) {
  var newElement = document.createElement(elementName); // Create the h2 element
  newElement[elementAttribute] = myText;

  var uniqueID = rndId(elementName);
  newElement.setAttribute("id", uniqueID);

  newElement.onclick = () => {
    rememberMyName(uniqueID, elementAttribute);
  };

  return newElement;
}

function rememberMyName(pickedID, elementAttribute) {
  // alert(clicked_id);
  window.pickedID = pickedID; // with window. we are getting global pickedID

  var element = document.getElementById(pickedID);

  textArea.value = element[elementAttribute];

  if (element.tagName == "IFRAME") {
    textArea.value = textArea.value.replace("/embed/", "/watch?v=");
  }
  if (element.tagName == "P") {
    textArea.value = textArea.value.replace(/<br>/g, "\n");
  }

  convertToEditMode();
}

function convertToEditMode() {
  document.getElementById("optionSelectContainer").style.display = "none";
  document.getElementById("deleteButton").style.display = null;
  document.getElementById("insertButton").innerHTML = "Update";
}
function convertToInsertMode() {
  pickedID = null;
  document.getElementById("textArea").value = "";
  document.getElementById("optionSelectContainer").style.display = null;
  document.getElementById("insertButton").innerHTML = "Insert";
  document.getElementById("deleteButton").style.display = "none";
}
function deleteElement() {
  if (pickedID != null) {
    var elementToDelete = document.getElementById(pickedID);
    elementToDelete.parentElement.removeChild(elementToDelete);

    convertToInsertMode();
  }
}
