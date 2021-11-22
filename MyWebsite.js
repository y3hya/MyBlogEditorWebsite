document.getElementById("insertButton").onclick = OnInsertClick;
document.getElementById("deleteButton").onclick = deleteElement;
var pickedID = null;

function rndId(elementName) {
  var i = Math.random().toString(16).slice(2);
  return elementName + i;
}

function addHeading(myText) {
  var h1element = document.createElement("h1"); // Create the H1 element
  // METHOD 1
  //   var textnode = document.createTextNode(text); // Create a text element
  //   h1element.appendChild(textnode); // Append the text node to the H1 element

  // METHOD 2
  h1element.textContent = myText;
  MyArticle.prepend(h1element);
}

function updateHeading(myText) {
  document.querySelector("#MyArticle h1").textContent = myText;
}
// ------------------------HEADING----------------------- //
function addSecondaryHeading(myText) {
  if (pickedID == null) {
    var elementName = "h2";
    var elementAttribute = "innerHTML";
    makePickableElement(elementName, myText, elementAttribute);
    // textArea.value = document.getElementById(uniqueID).innerHTML;
  } else {
    document.getElementById(pickedID).innerHTML = textArea.value;
  }
}



// ------------------------PARAGRAPH----------------------- //
function addParagraph(myText) {
  if (pickedID == null) {
    var elementName = "p";
    var elementAttribute = "innerHTML";
    makePickableElement(elementName, myText, elementAttribute);
    // textArea.value = document.getElementById(uniqueID).innerHTML;
  } else {
    document.getElementById(pickedID).innerHTML = textArea.value;
  }
}


function addImage(myText) {
  var divElement = document.createElement("div");
  divElement.setAttribute("class", "flex-center");

  var imgElement = document.createElement("img"); // Create the image element
  imgElement.src = myText;

  divElement.appendChild(imgElement);
  MyArticle.appendChild(divElement);
}

function addVideo(myText) {
  if (!myText.includes("/watch?v=")) {
    return alert("Bad youtube url");
  }

  var divElement = document.createElement("div");
  divElement.setAttribute("class", "flex-center");

  var vidElement = document.createElement("iframe"); // Create the image element
  vidElement.src = myText.replace("/watch?v=", "/embed/");
  vidElement.setAttribute("frameborder", "0");
  vidElement.setAttribute("class", "videoAttach");

  divElement.appendChild(vidElement);
  MyArticle.appendChild(divElement); // Append the H1 element to text-Area
}

/* <iframe
  width="790"
  height="444"
  src="https://www.youtube.com/embed/akVX0X2GQf8"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe> */

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
    if (document.querySelector("#MyArticle h1") == null) {
      addHeading(myText);
    } else {
      updateHeading(myText);
    }
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

function makePickableElement(elementName, myText, elementAttribute) {
  var newElement = document.createElement(elementName); // Create the h2 element
  newElement[elementAttribute] = myText;

  var uniqueID = rndId(elementName);
  newElement.setAttribute("id", uniqueID);

  newElement.onclick = () => {
    rememberMyName(uniqueID, elementAttribute);
  };

  MyArticle.appendChild(newElement); // Append the H1 element to text-Area
}

function rememberMyName(pickedID, elementAttribute) {
  // alert(clicked_id);
  window.pickedID = pickedID;
  textArea.value = document.getElementById(pickedID)[elementAttribute];
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
