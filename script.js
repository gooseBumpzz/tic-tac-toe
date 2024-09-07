const restartBtn = document.getElementById ("restartBtn");  
const statusText = document.getElementById ("status");
const cells = document.querySelectorAll(".cell")
let currentPlayer = "X";
let markerArray = ["", "", "", "", "", "", "", "", ""]

// create a gameboard, select each cell and add a marker to it
function startGame () {
    //reassign DOM element after removeListeners() is fired
    const cells = document.querySelectorAll(".cell")
    const statusText = document.getElementById ("status");
    
    //add status text before the game
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(element => {
        element.addEventListener("click", clikedCell, { once: true }) 
        function clikedCell () {
            // add a market to a specific index of the markerArray
            const elemIndex =element.getAttribute("index")
            markerArray[elemIndex] = currentPlayer;

            // addd a marker to the game board
            element.textContent = currentPlayer;            

            // switch players
            currentPlayer = (currentPlayer == "X")? "O": "X";
            // add status text in the game
            statusText.textContent = `${currentPlayer}'s turn`;
            console.log(markerArray)
            checkWinner ();           
        }       
    }); 
}
startGame();

function checkWinner () {
    const winCombo = [[0,1,2], [0,4,8], [0,3,6], [3,4,5], [6,7,8], [2,4,6], [1,4,7], [2,5,8]]
    let roundWon = false;
    winCombo.forEach(combo =>{
        if (markerArray[combo[0]] == "X" && markerArray[combo[1]] == "X" && markerArray[combo[2]] == "X"){
            statusText.textContent = "X wins";
            roundWon = true;
            removeListeners();
            
        }
        else if (markerArray[combo[0]] == "O" && markerArray[combo[1]] == "O" && markerArray[combo[2]] == "O"){
            statusText.textContent = "O wins";
            roundWon = true;
            removeListeners();
        }
            }) 
    //check for draw
    if (markerArray.every(hasValue) && roundWon == false){
        statusText.textContent = "Draw";
    } 
    function hasValue (value){
        return value != "";
    }
}

//add restart button
restartBtn.addEventListener("click", restart);

function restart (){
    currentPlayer = "X";
    markerArray = ["", "", "", "", "", "", "", "", ""]
    const cells = document.querySelectorAll(".cell")
    cells.forEach(element => {element.textContent = ""});
    startGame ();
}

//remove "click" after someone wins
function removeListeners() {
    cells.forEach(el => {
        el.replaceWith(el.cloneNode(true))
    })  
} 
