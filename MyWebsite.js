document.getElementById("insertButton").onclick = OnInsertClick;
var pickedID = null;

function rndId() {
  var i = Math.random().toString(16).slice(2);
  return i;
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

function addSecondaryHeading(myText) {
  var h2element = document.createElement("h2"); // Create the h2 element
  h2element.textContent = myText;

  MyArticle.appendChild(h2element); // Append the H1 element to text-Area
}

// ------------------------PARAGRAPH----------------------- //
function addParagraph(myText) {
  console.log(pickedID);
  if (pickedID == null) {
    var pElement = document.createElement("p"); // Create the h2 element
    pElement.textContent = myText;

    MyArticle.appendChild(pElement); // Append the H1 element to text-Area

    var paraID = "P-" + rndId();

    pElement.setAttribute("id", paraID);
    // pElement.setAttribute("onClick", "reply_click(this.id)");

    document.getElementById(paraID).onclick = () => {
      rememberMyName(paraID);
      textArea.value = document.getElementById(paraID).innerHTML;
    };
  } else {
    document.getElementById(pickedID).innerHTML = textArea.value;
  }
}
// ------------------------PARAGRAPH-END------------------- //

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
  console.log(myText);
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
  document.getElementById("textArea").value = "";
}

function rememberMyName(clicked_id) {
  // alert(clicked_id);
  pickedID = clicked_id;
}
