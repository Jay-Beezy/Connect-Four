/*
@author Jake Beesley
@file connectFour.js
@date 11/2/2020
@brief

  This code makes up Project 1 for EECS 368 at the University of Kansas

  Connect Four :
    Makes a 2D array with all values initialized to zero. When the user types
    a number 1 - 7 on their keyboard, the 2D array gets updated with either a
    "1" or a "2" depending on if they are player 1 or player 2, at the corresponding
    index of the 2D array. The array constantly gets scanned, and adds a chip
    at the corresponding column that the user selected.

    When a winner is found, the game ends, and the [RESET] button must be clicked
    in order for another game to start. When another game starts, all values of
    the 2D array are set back to 0, all counters (such as chip count or who was
    declared the winner) are set to 0, and the players are able to play a brand
    new game of Connect Four. The reset button can be clicked at any time to
    reset the board.

*/

let canvas = document.querySelector("#myCanvas");
let context = canvas.getContext('2d');

context.font = "40pt Calibri";
context.fillStyle = "red";

var boardArray = new Array(7);
for(let i = 0; i < 7; i++){
  boardArray[i] = new Array(6);
  for(let j = 0; j < 6; j++){
    boardArray[i][j] = 0;
  }
}

var playerCounter = 0; //Used to determine which player is next
var playerOneWinner = 0; //Changed to 1 when playerOne wins
var playerTwoWinner = 0; //Changed to 1 when playerTwo wins

//Checks if the column is within the appropriate bounds, then scans the board to see if a chip can be placed
function validMarker(columnSelection){
  if(columnSelection < 0 || columnSelection > 6){
    return(false);
  }
  else{
    for(let j = 0; j < 6; j++){
      if(boardArray[columnSelection][0] == 1 || boardArray[columnSelection][0] == 2){
        //playerCounter is decremented because othewise the player that selected
        //the invalid column would lose their turn.
        --playerCounter;
        return(false);
      }
      else{ //If the column is between 0 and 6 and doesnt have 6 chips in it
        return(true);
      }
    }
  }
}

//Places a 1 at the corresponding column on boardArray
function placemarkerplayerOne(columnSelection){
  if(validMarker(columnSelection) == true){
    if(boardArray[columnSelection][5] == 0 && boardArray[columnSelection][5] != 2){
      boardArray[columnSelection][5] = 1;
    }
    else if(boardArray[columnSelection][4] == 0 && boardArray[columnSelection][4] != 2){
      boardArray[columnSelection][4] = 1;
    }
    else if(boardArray[columnSelection][3] == 0 && boardArray[columnSelection][3] != 2){
      boardArray[columnSelection][3] = 1;
    }
    else if(boardArray[columnSelection][2] == 0 && boardArray[columnSelection][2] != 2){
      boardArray[columnSelection][2] = 1;
    }
    else if(boardArray[columnSelection][1] == 0 && boardArray[columnSelection][1] != 2){
      boardArray[columnSelection][1] = 1;
    }
    else if(boardArray[columnSelection][0] == 0 && boardArray[columnSelection][0] != 2){
      boardArray[columnSelection][0] = 1;
    }
  }
}

//Places a 2 at the corresponding column on boardArray
function placemarkerplayerTwo(columnSelection){
  if(validMarker(columnSelection) == true){
    if(boardArray[columnSelection][5] == 0 && boardArray[columnSelection][0] != 1){
      boardArray[columnSelection][5] = 2;
    }
    else if(boardArray[columnSelection][4] == 0 && boardArray[columnSelection][0] != 1){
      boardArray[columnSelection][4] = 2;
    }
    else if(boardArray[columnSelection][3] == 0 && boardArray[columnSelection][0] != 1){
      boardArray[columnSelection][3] = 2;
    }
    else if(boardArray[columnSelection][2] == 0 && boardArray[columnSelection][0] != 1){
      boardArray[columnSelection][2] = 2;
    }
    else if(boardArray[columnSelection][1] == 0 && boardArray[columnSelection][0] != 1){
      boardArray[columnSelection][1] = 2;
    }
    else if(boardArray[columnSelection][0] == 0 && boardArray[columnSelection][0] != 1){
      boardArray[columnSelection][0] = 2;
    }
  }
}

//Shows the users the available columns to select with their keyboard
const columnHelper = {
  columns : ['1','2','3','4','5','6','7']
}

function splatColumns(){
  for(let i = 0; i < 7; i++){
    context.fillStyle = 'black';
    context.fillText(columnHelper.columns[i], 35 + i * 85, 575);
  }
}

function checkWinner(){
  if(playerCounter != 42){
    if(checkHorizontal() == 1){
      console.log("Player one wins horizontally!");
      playerOneWinner = 1;
      return(true);
    }
    else if(checkHorizontal() == 2){
      console.log("Player two wins horizontally!");
      playerTwoWinner = 1;
      return(true);
    }
    else if(checkVertical() == 1){
      console.log("Player one wins vertically!");
      playerOneWinner = 1;
      return(true);
    }
    else if(checkVertical() == 2){
      console.log("Player two wins vertically!");
      playerTwoWinner = 1;
      return(true);
    }
    else if(checkDiagonal() == 1){
      console.log("Player one wins diagonally!");
      playerOneWinner = 1;
      return(true);
    }
    else if(checkDiagonal() == 2){
      console.log("Player two wins diagonally!");
      playerTwoWinner = 1;
      return(true);
    }
  }
  else{
    console.log("Chipcount exceeded, GAME OVER");
    return(false);
  }
}

function checkHorizontal(){
  for(let i = 0; i < 4; i++){ //i < 4 so that the board doesnt scan an invalid position
    for(let j = 0; j < 6; j++){
        if(boardArray[i][j] == 1 && boardArray[i+1][j] == 1 && boardArray[i+2][j] == 1 && boardArray[i+3][j] == 1){
          return(1);
        }
        else if(boardArray[i][j] == 2 && boardArray[i+1][j] == 2 && boardArray[i+2][j] == 2 && boardArray[i+3][j] == 2){
          return(2);
        }
    }
  }
}

function checkVertical(){
  for(let i = 0; i < 7; i++){
    for(let j = 0; j < 3; j++){ //j < 3 so that the board doesnt scan an invalid position
        if(boardArray[i][j] == 1 && boardArray[i][j+1] == 1 && boardArray[i][j+2] == 1 && boardArray[i][j+3] == 1){
          return(1);
        }
        else if(boardArray[i][j] == 2 && boardArray[i][j+1] == 2 && boardArray[i][j+2] == 2 && boardArray[i][j+3] == 2){
          return(2);
        }
    }
  }
}

function checkDiagonal(){
  if(checkRightDiagonal() == 1){
    return(1);
  }
  else if(checkRightDiagonal() == 2){
    return(2);
  }
  else if(checkLeftDiagonal() == 1){
    return(1);
  }
  else if(checkLeftDiagonal() == 2){
    return(2);
  }
}

function checkRightDiagonal(){
  for(let i = 3; i < 7; i++){
    for(let j = 0; j < 3; j++){
        if(boardArray[i][j] == 1 && boardArray[i-1][j+1] == 1 && boardArray[i-2][j+2] == 1 && boardArray[i-3][j+3] == 1){
          return(1);
        }
        else if(boardArray[i][j] == 2 && boardArray[i-1][j+1] == 2 && boardArray[i-2][j+2] == 2 && boardArray[i-3][j+3] == 2){
          return(2);
        }
    }
  }
}

function checkLeftDiagonal(){
  for(let i = 3; i < 7; i++){
    for(let j = 3; j < 6; j++){
        if(boardArray[i][j] == 1 && boardArray[i-1][j-1] == 1 && boardArray[i-2][j-2] == 1 && boardArray[i-3][j-3] == 1){
          return(1);
        }
        else if(boardArray[i][j] == 2 && boardArray[i-1][j-1] == 2 && boardArray[i-2][j-2] == 2 && boardArray[i-3][j-3] == 2){
          return(2);
        }
    }
  }
}

function resetBoard(){
  for(let i = 0; i < 7; i++){
    for(let j = 0; j < 6; j++){
      boardArray[i][j] = 0;
    }
  }
  playerOneWinner = 0;
  playerTwoWinner = 0;
  playerCounter = 0;
}

//Graphic for red player victory
function victoryRedPlayer(){
  context.beginPath();
  context.fillStyle = 'black';
  context.fillRect(0,595,615,155);
  context.stroke();

  context.beginPath();
  context.fillStyle = 'yellow';
  context.fillRect(0,600,610,150);
  context.stroke();

  context.fillStyle = 'red';
  context.fillText("Player One (Red) Wins!", 50, 675);

  context.save();
  context.font = "20pt  Calibri"
  context.fillStyle = 'black';
  context.fillText("Hit [RESET] to play again!", 175, 735);
  context.restore();
}

//Graphic for yellow player victory
function victoryYellowPlayer(){
  context.beginPath();
  context.fillStyle = 'black';
  context.fillRect(0,595,615,155);
  context.stroke();

  context.beginPath();
  context.fillStyle = 'red';
  context.fillRect(0,600,610,150);
  context.stroke();

  context.fillStyle = 'yellow';
  context.fillText("Player Two (Yellow) Wins!", 25, 675);

  context.save();
  context.font = "20pt  Calibri"
  context.fillStyle = 'black';
  context.fillText("Hit [RESET] to play again!", 175, 735);
  context.restore();
}

//Graphic for tie
function stalemate(){
  context.beginPath();
  context.fillStyle = 'black';
  context.fillRect(0,595,615,155);
  context.stroke();

  context.beginPath();
  context.fillStyle = 'red';
  context.fillRect(0,600,610,150);
  context.stroke();

  context.fillStyle = 'black';
  context.fillText("Stalemate,", 175, 660);

  context.fillStyle = 'black';
  context.fillText("neither player won!", 80, 710);
}

//Graphic for who's turn is next
function nextPlayer(){
  if(playerCounter % 2 == 0){
    context.beginPath();
    context.fillStyle = 'black';
    context.fillRect(0,595,615,155);
    context.stroke();

    context.beginPath();
    context.fillStyle = 'white';
    context.fillRect(0,600,610,150);
    context.stroke();

    context.fillStyle = 'red';
    context.fillText("Player One's turn!", 110, 680);
  }
  else{
    context.beginPath();
    context.fillStyle = 'black';
    context.fillRect(0,595,615,155);
    context.stroke();

    context.beginPath();
    context.fillStyle = 'white';
    context.fillRect(0,600,610,150);
    context.stroke();

    context.fillStyle = 'yellow';
    context.fillText("Player Two's turn!", 110, 680);
  }
}

//Circle and rectangle functionality learned from w3schools.com
//Uses canvas arc method to draw circles at their respective location
//Uses canvas fillRect method to draw a rectangle behind the squares
//Source: https://www.w3schools.com/tags/canvas_arc.asp
//Source: https://www.w3schools.com/tags/canvas_fillrect.asp
function boardDesign() {
  //Puts a black rectangle behind the light blue one, to give it a black border
  context.beginPath();
  context.fillStyle = 'black';
  context.fillRect(0,0,610,525);
  context.stroke();
  //Puts a light blue rectangle on the canvas
  context.beginPath();
  context.fillStyle = '#03D5FF';
  context.fillRect(5,5,600,515);
  context.stroke();
  //Fills the canvas with black circles to give the white circles a better outline
  for(let i = 0; i < 7; i++){
    for(let j = 0; j < 6; j++){
      context.beginPath();
      context.fillStyle = 'black';
      context.style = '3px';
      context.arc((50+85*i), (50+85*j), 40, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
    }
  }
}

document.querySelector("body").addEventListener( "keydown", e => {
    let id = parseInt(e.key) - 1;
    if (typeof(id) != "number" || (id > 6)) {
      return;
    }
    else if(checkWinner() == true || playerCounter == 42){
      console.log("Game Over!");
    }
    else{
      if(playerCounter % 2 == 0){ //Player One
        placemarkerplayerOne(id);
        ++playerCounter;
      }
      else{ //Player Two
        placemarkerplayerTwo(id);
        ++playerCounter;
      }
    }
  }
);

function render(){
  do{
    for(let i = 0; i < 7; i++){
      for(let j = 0; j < 6; j++){
        if(boardArray[i][j] == 0){
          context.beginPath();
          context.fillStyle = 'white';
          context.style = '3px';
          context.arc((50+85*i), (50+85*j), 37, 0, 2 * Math.PI);
          context.fill();
          context.stroke();
        }
        else if(boardArray[i][j] == 1){
          context.beginPath();
          context.fillStyle = 'red';
          context.style = '3px';
          context.arc((50+85*i), (50+85*j), 37, 0, 2 * Math.PI);
          context.fill();
          context.stroke();
        }
        else if(boardArray[i][j] == 2){
          context.beginPath();
          context.fillStyle = 'yellow';
          context.style = '3px';
          context.arc((50+85*i), (50+85*j), 37, 0, 2 * Math.PI);
          context.fill();
          context.stroke();
        }
      }
    }
    if(playerOneWinner == 1){
      victoryRedPlayer(); //Calls red player win graphic
    }
    else if(playerTwoWinner == 1){
      victoryYellowPlayer(); //Calls yellow player win graphic
    }
    else if(playerCounter == 42){
      stalemate(); //Calls tie graphic
    }
    else if(playerCounter % 2 == 0){
      //Graphic telling player one it is their turn
      context.beginPath();
      context.fillStyle = 'black';
      context.fillRect(0,595,615,155);
      context.stroke();

      context.beginPath();
      context.fillStyle = 'white';
      context.fillRect(0,600,610,150);
      context.stroke();

      context.beginPath();
      context.fillStyle = 'black';
      context.fillRect(90,620,430,85);
      context.stroke();

      context.beginPath();
      context.fillStyle = 'red';
      context.fillRect(95,625,420,75);
      context.stroke();

      context.fillStyle = 'black';
      context.fillText("Player One's turn!", 110, 680);
    }
    else if(playerCounter % 2 == 1){
      //Graphic telling player two it is their turn
      context.beginPath();
      context.fillStyle = 'black';
      context.fillRect(0,595,615,155);
      context.stroke();

      context.beginPath();
      context.fillStyle = 'white';
      context.fillRect(0,600,610,150);
      context.stroke();

      context.beginPath();
      context.fillStyle = 'black';
      context.fillRect(90,620,430,85);
      context.stroke();

      context.beginPath();
      context.fillStyle = 'yellow';
      context.fillRect(95,625,420,75);
      context.stroke();

      context.fillStyle = 'black';
      context.fillText("Player Two's turn!", 110, 680);
    }
  }while(checkWinner() == false)
}

var resetButton = document.getElementById('resetbuttonTest');
  resetButton.addEventListener("click", (e) => {
    console.clear();
    console.log("RESET");
    resetBoard();
});

function splat(t) {
  context.clearRect(0,0,canvas.width,canvas.height)
  boardDesign(); //Initially draws an empty board
  render(); //boardArray is scaned, and white/red/yellow chips are added at the corresponding index of boardArray
  splatColumns(); //adds a number to the bottom of the board for user friendlyness
  window.requestAnimationFrame(splat);
}
window.requestAnimationFrame(splat);
