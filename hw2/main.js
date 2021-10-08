image = [
  [
    "https://i.imgur.com/RVQC3qp.jpg", // page1
    "https://i.imgur.com/0P0g522.jpg", // page2
    "https://i.imgur.com/Zf7STtS.jpg", // page3
    "https://i.imgur.com/AuQx47w.jpg", // page4
  ],
  [
    "https://i.imgur.com/2TFP8Tt.png",
    "https://i.imgur.com/79ij780.png",
    "https://i.imgur.com/2QTX9m5.png",
    "https://i.imgur.com/K16sNkQ.png",
    "https://i.imgur.com/eOSzSD6.png",
  ],
  [
    "https://i.imgur.com/IviAsFP.jpg",
    "https://i.imgur.com/I5onuoK.jpg",
    "https://i.imgur.com/Yt29j9X.jpg",
    "https://i.imgur.com/EDcYEzG.jpg",
    "https://i.imgur.com/ZaPVhUV.jpg",
  ],
];

let currentImgIdx = 0,
  album_index = 0;

let displayImg = document.getElementById("main_pic"),
  previous = document.getElementById("previous"),
  next = document.getElementById("next");

// init
displayImg.src = image[album_index][currentImgIdx];
checkIndex();
set_album(0);
change_focus();

function prevImg() {
  if (currentImgIdx > 0) setImg(--currentImgIdx);
  change_focus();
}

function nextImg() {
  if (currentImgIdx < image[album_index].length - 1) setImg(++currentImgIdx);
  change_focus();
}

function change_focus() {
  for (let i = 0; i < image[album_index].length; i++) {
    if (i === currentImgIdx) {
      element = document.getElementById(String(i));
      element.classList.add("focused");
    } else {
      element = document.getElementById(String(i));
      element.classList.remove("focused");
    }
  }
}

function setImg(index) {
  checkIndex();
  displayImg.src = image[album_index][currentImgIdx];
}

function setImgUrl(url) {
  currentImgIdx = image[album_index].indexOf(url);
  checkIndex();
  displayImg.src = url;
  change_focus();
}

function set_album(index) {
  album_index = index;
  currentImgIdx = 0;
  displayImg.src = image[album_index][0];
  var parent = document.getElementById("prev_bar");
  parent.innerHTML = "";
  previous.classList.add("disabled");
  next.classList.remove("disabled");

  // remove original child and add new child under prev_bar
  for (let i = 0; i < image[album_index].length; i++) {
    var url = image[album_index][i];
    var element = document.createElement("img");
    element.setAttribute("src", url);
    element.setAttribute("id", i);
    element.addEventListener("click", setImgUrl.bind(null, url));
    parent.appendChild(element);
  }

  // add focus border
  focus_border = document.getElementById("0");
  focus_border.classList.add("focused");

  // add focus border on album name
  for (let i = 0; i < 4; i++) {
    id = "album" + String(i + 1);
    console.log(id);
    element = document.getElementById(id);
    if (i !== index) {
      element.classList.remove("bordered");
    } else {
      element.classList.add("bordered");
    }
  }
}

function checkIndex() {
  if (currentImgIdx === 0) {
    previous.classList.add("disabled");
  } else if (currentImgIdx === image[album_index].length - 1) {
    next.classList.add("disabled");
  } else {
    previous.classList.remove("disabled");
    next.classList.remove("disabled");
  }
}

function empty_album() {
  alert("This is an empty album!");
}
