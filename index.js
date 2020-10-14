//default 
var homeDiv = document.getElementById("Home");
var helpDiv= document.getElementById("Help");
var playDiv= document.getElementById("Play");
var selectDiv=document.getElementById("selectImage");

homeDiv.style.display="block";
helpDiv.style.display="none";
playDiv.style.display="none";
selectDiv.style.display="none";


//  select image button

function selectImageFunction() {
  if (homeDiv.style.display === "none") {
    homeDiv.style.display = "block";
    playDiv.style.display="none";
    helpDiv.style.display="none";
    selectDiv.style.display="none";
  } else {
    homeDiv.style.display = "none";
    selectDiv.style.display="block";
    helpDiv.style.display="none";
    playDiv.style.display="none";

  }
}
// play button
function playFunction() {
  if (homeDiv.style.display === "none") {
    homeDiv.style.display = "block";
    playDiv.style.display="none";
    helpDiv.style.display="none";
  } else {
    homeDiv.style.display = "none";
    playDiv.style.display="block";
    helpDiv.style.display="none";

  }
}
// help button 
function helpFunction() {
 
  if (homeDiv.style.display === "none") {
    homeDiv.style.display = "block";
    helpDiv.style.display= "none";
  } else {
    homeDiv.style.display = "none";
    helpDiv.style.display="block";
  }
}

// return button help to home
function helpReturn(){
 
  if (helpDiv.style.display === "none") {
    helpDiv.style.display= "block";
    playDiv.style.display="none";
    homeDiv.style.display = "none";
    
  } else {
    helpDiv.style.display="none";
    playDiv.style.display="none";
    homeDiv.style.display = "block";

  }
}

// return button play to home

function playReturn(){
 
  if (playDiv.style.display === "none") {
    playDiv.style.display= "block";
    helpDiv.style.display="none";
    homeDiv.style.display = "none";
    
  } else {
    playDiv.style.display="none";
    helpDiv.style.display="none"
    homeDiv.style.display = "block";

  }
}

// return button select image to home
function selectReturn(){
 
  if (selectDiv.style.display === "none") {
    selectDiv.style.display= "block";
    helpDiv.style.display="none";
    homeDiv.style.display = "none";
    playDiv.style.display="none";
    
  } else {
    playDiv.style.display="none";
    helpDiv.style.display="none";
    selectDiv.style.display="none";
    homeDiv.style.display = "block";

  }
}

// level Buttons
/*
function hardFunction(){
 level="3";

}
function mediumFunction(){
level="2";

}
function easyFunction(){
level="1";

}
*/


// Ammar section 

/**
 * variables related to the game like: level and image pieces path and css variables related
 */

let level = '1', 
imageName = 'img1';

/**
 * css variables
 */
  const gridSize = '--grid-size',
  displayLevel3 = '--display-level3',
  displayLevel2 = '--display-level2';


/* Adding event listeners to the drageable pieces and the containers ...*/ 
const gridCells = document.querySelectorAll('div.grid-board div.cell');

gridCells.forEach(cell => {
cell.addEventListener('drop', (e) => {
  if( cell !== e.target) return;
  e.preventDefault();
  var data = e.dataTransfer.getData("imagePart");
  e.target.appendChild(document.getElementById(data));
});

cell.addEventListener('dragover', (e)=>{
  if( cell !== e.target) return; // prevent the event to be assigned to the children of the dive, in case we have to images in the same div
  e.preventDefault();// cancel the event if it is cancelable .. 
});
});

const imagePiecesContainer = document.querySelector('div.image-pieces-container')

imagePiecesContainer.addEventListener('drop', (e) => {
if( imagePiecesContainer !== e.target) return;
e.preventDefault();
var data = e.dataTransfer.getData("imagePart");
e.target.appendChild(document.getElementById(data));
},false);

imagePiecesContainer.addEventListener('dragover', (e)=>{
if( imagePiecesContainer !== e.target) return;
e.preventDefault();// cancel the event if it is cancelable .. 
},false);

const imagePieces = document.querySelectorAll('img.dragable');

imagePieces.forEach(piece => {
piece.addEventListener('dragstart',(e)=>{
  e.dataTransfer.setData('imagePart',e.target.id);
})

piece.addEventListener('drop',(e)=>{
  ;// cancel the event if it is cancelable .. 
})
})




/*
Adding event listeners to the cofiguration options and the submit button
*/
const imageOptions = document.querySelectorAll('input.img-select')

const levelOptions = document.querySelectorAll('input.level-select');

const setBtn = document.querySelector('button.config-btn');

imageOptions.forEach(option => {
option.addEventListener('click',(e)=>{
  imageName = e.target.value;
  console.log(imageName);
})
});

levelOptions.forEach(option => {
option.addEventListener('click', (e)=>{
  level = e.target.value;
  console.log(level);
})
});

setBtn.addEventListener('click', (e)=>{
/**
* image srouce update according to level and selected image
*/
const gridBoardcells = document.querySelectorAll('div.grid-board .cell');
const imagesContainer = document.querySelector('div.image-pieces-container');
gridBoardcells.forEach(cell =>{
  console.log(cell);
  if(cell.firstChild !== null)
  imagesContainer.appendChild(cell.removeChild(cell.firstChild));
})
const images = document.querySelectorAll('img.dragable');
const root = document.documentElement;
images.forEach(image =>{
  let imgSrc = image.src;
  image.src = `./${imageName}_${level}${imgSrc.slice(imgSrc.lastIndexOf('/'))}`;
  // console.log(typeof image.src); // debugging code 
  // console.log(image.src);
})

switch (level) {
  case '1':
      root.style.setProperty(gridSize, '3');
      root.style.setProperty(displayLevel2, 'none');
      root.style.setProperty(displayLevel3, 'none');
      break;
  case '2':
      root.style.setProperty(gridSize, '4');
      root.style.setProperty(displayLevel2, 'block');
      root.style.setProperty(displayLevel3, 'none');
      break;
  case '3':
      root.style.setProperty(gridSize, '5');
      root.style.setProperty(displayLevel2, 'block');
      root.style.setProperty(displayLevel3, 'block');
      break;
  default:
      break;
}
});
