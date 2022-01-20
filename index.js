var turns = 0;

var human = "X";
var AI = "O";

var stateArrVars = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2","c3"];


function getBoard() {

    var board = [];
    for(let i=0; i<9; ++i) {
        var sym = document.getElementById(stateArrVars[i]).innerHTML;
        sym == "" ? board.push(i) : board.push(sym);
    }
    return board;

}

function drawX(cell) {

    var tablecell = document.getElementById(cell);
    tablecell.innerHTML = "X";
    tablecell.style.color = "blue"

}

function drawO(cell) {

    var tablecell = document.getElementById(cell);
    tablecell.innerHTML = "O";
    tablecell.style.color = "red"

}

function play(cellId) {

    board = getBoard();

    if(winPattern(board, AI)) return;
    if(isOccupied(cellId)) return;

    if((turns%2) == 0) {
        drawX(cellId);
        turns += 1;
        winPatternSymbol(board, "X");
    } else {
        drawO(cellId);
        console.log(turns);
        turns += 1;
        winPatternSymbol(board, "O");
    }

    if(winPattern(board, human)) return;
    if(isFull()) return;

    playMinimax();

}

function AIPlay(cellId) {

    var board = getBoard();
    if(winPattern(board, human)) return;
    if((turns%2) == 0) {
        drawX(cellId);
        winPatternSymbol(board, "X");
        turns += 1;

    } else {
        drawO(cellId);
        winPatternSymbol(board, "O");
        turns += 1;
    }

}

function isOccupied(cell) {

    var tableCell = document.getElementById(cell);
    var cellContent = tableCell.innerHTML
    if(cellContent == "X" || cellContent == "O") {
        return true;
    } else {
        return false;
    }

}

function winPattern(board, player){

    if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
        ) {
        return true;
    } else {
        return false;
    }

}

function winPatternSymbol(board, symbol) {

    if(winPattern(board, symbol)) {
        var winnerSpan = document.getElementById("winner");
        var winsSpan = document.getElementById("wins");
        winnerSpan.innerHTML = symbol;
        winnerSpan.removeAttribute("hidden");
        winsSpan.removeAttribute("hidden");

        if(symbol == "X") {
            winnerSpan.style.color = "blue";
        } else {
            winnerSpan.style.color = "red";
        }

    } else if(isFull()) {
        var drawsSpan = document.getElementById("draws");
        drawsSpan.removeAttribute("hidden");
    }

}

function isFull() {

    var tacArr = document.getElementsByClassName("tc");
    for(let i=0; i<9; ++i) {
        if (tacArr[i].innerHTML == "" ) return false;
    }
    return true;

}

function isEmpty(cell) {

    var tableCell = document.getElementById(cell).innerHTML;
    if(tableCell == "") {
        return true;
    } else {
        return false;
    }

}

function playRandom() {

    for(let i=0; i<9; ++i) {
        var cellId = stateArrVars[i];
        if(isEmpty(cellId)) {
            AIPlay(cellId);
            break;
        }
    }

}

function playMinimax() {

    var board = getBoard();
    var bMove = minimax(board, AI).index;
    var cell = stateArrVars[bMove];
    AIPlay(cell);
    winPatternSymbol(getBoard(), AI);

}

function logBoard(board) {

    console.log(board);

}

function availableMoves(board) {

    var availMoves = [];
    for(let i=0; i<board.length; i++) {
        if(!isNaN(board[i])) {
            availMoves.push(i);
        }
    }
    return availMoves;

}


function minimax(board, player) {

    var availMoves = availableMoves(board);
    var moves = [];

    if (winPattern(board, human)){
        return {score:-10};
    } else if (winPattern(board, AI)){
        return {score:10};
    } else if (availMoves.length === 0){
        return {score:0};
    }
    
  
    for (var i = 0; i < availMoves.length; i++){
        var move = {};
        move.index = board[availMoves[i]];
        board[availMoves[i]] = player;

        if (player == AI){
            var result = minimax(board,human);
            move.score = result.score;
        }
        else {
            var result = minimax(board, AI);
            move.score = result.score;
        }

        board[availMoves[i]] = move.index;
        moves.push(move);
    }
  
    var bestMove;
    if(player == AI){

        var bestScore = -10000;
        for(var i = 0; i < moves.length; i++){
          if(moves[i].score > bestScore){
            bestScore = moves[i].score;
            bestMove = i;
          }
        }

    }else {

        var bestScore = 10000;
        for(var i = 0; i < moves.length; i++){
          if(moves[i].score < bestScore){
            bestScore = moves[i].score;
            bestMove = i;
          }
        }

    } 
    return moves[bestMove];

}

function refreshDOM() {

    window.location.reload();

}