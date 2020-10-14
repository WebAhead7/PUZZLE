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




