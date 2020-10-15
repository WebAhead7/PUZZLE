/**
 * constructor function 
 */
function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

/**
 * variables related to the game like: level and image pieces path and css variables related
 */

let level = '1',
    imageName = 'img1',
    puzzleSizeMap = {
        '1': 9,
        '2': 16,
        '3' : 25
    };

/**
 * css variables
 */
const gridSize = '--grid-size',
    displayLevel3 = '--display-level3',
    displayLevel2 = '--display-level2';


/**
 * html elements variables
 */
const btnSound = new Sound('./sounds/buttonClick.mp3');
const selectSound = new Sound('./sounds/select_option.mp3');
const dragSound = new Sound('./sounds/puzzle_movement.mp3');
const dropSound = new Sound('./sounds/puzzle_piece_drop.mp3');
const winSound = new Sound('./sounds/Applause.mp3');

const gridCells = document.querySelectorAll('div.grid-board div.cell');

const imagePiecesContainer = document.querySelector('div.image-pieces-container');

const imagePieces = document.querySelectorAll('img.dragable');

const imageOptions = document.querySelectorAll('input.img-select')

const levelOptions = document.querySelectorAll('input.level-select');

const setBtn = document.querySelector('button.config-btn');

/**
 * general functions...
 */
function isPuzzleCompleted() {
    let boardCells = [...gridCells].slice(0,puzzleSizeMap[level]);
    return boardCells.map(cell => {
        return cell.firstChild !== null ? cell.firstChild.id === cell.getAttribute("data-peice") : false;
    }).reduce((a,b)=> a&&b);
}


/* Adding event listeners to the drageable pieces and the containers ...*/

gridCells.forEach(cell => {
    cell.addEventListener('drop', (e) => {
        if (cell !== e.target) return;
        dropSound.play();
        e.preventDefault();
        var data = e.dataTransfer.getData("imagePart");
        e.target.appendChild(document.getElementById(data));
        /**
         * add function that cheks if the puzzle successfuly completed
         */
        if(isPuzzleCompleted()){
            winSound.play();
        }
    });

    cell.addEventListener('dragover', (e) => {
        if (cell !== e.target) return; // prevent the event to be assigned to the children of the dive, in case we have to images in the same div
        dragSound.stop();
        e.preventDefault();// cancel the event if it is cancelable .. 
    });
});


imagePiecesContainer.addEventListener('drop', (e) => {
    if (imagePiecesContainer !== e.target) return;
    e.preventDefault();
    dropSound.play();
    var data = e.dataTransfer.getData("imagePart");
    e.target.appendChild(document.getElementById(data));
}, false);

imagePiecesContainer.addEventListener('dragover', (e) => {
    if (imagePiecesContainer !== e.target) return;
    dragSound.stop();
    e.preventDefault();// cancel the event if it is cancelable .. 
}, false);

imagePieces.forEach(piece => {
    piece.addEventListener('dragstart', (e) => {
        dragSound.play();
        e.dataTransfer.setData('imagePart', e.target.id);
    })

    piece.addEventListener('drop', (e) => {
        e.preventDefault();// cancel the event if it is cancelable .. 
    })
})

/*
Adding event listeners to the cofiguration options and the submit button
*/
imageOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        selectSound.play();
        imageName = e.target.value;
        console.log(imageName);
    })
});

levelOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        selectSound.play();
        level = e.target.value;
        console.log(level);
    })
});

setBtn.addEventListener('click', (e) => {
    /**
     * image srouce update according to level and selected image
     */
    btnSound.play();
    const gridBoardcells = document.querySelectorAll('div.grid-board .cell');
    const imagesContainer = document.querySelector('div.image-pieces-container');
    gridBoardcells.forEach(cell => {
        console.log(cell);
        if (cell.firstChild !== null)
            imagesContainer.appendChild(cell.removeChild(cell.firstChild));
    })
    const images = document.querySelectorAll('img.dragable');
    const root = document.documentElement;
    images.forEach(image => {
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

    isPuzzleCompleted();// debugging code...
});





