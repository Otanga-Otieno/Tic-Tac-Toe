var turns = 1;

var a1 = document.getElementById("a1").innerHTML;
var a2 = document.getElementById("a2").innerHTML;
var a3 = document.getElementById("a3").innerHTML;
var b1 = document.getElementById("b1").innerHTML;
var b2 = document.getElementById("b2").innerHTML;
var b3 = document.getElementById("b3").innerHTML;
var c1 = document.getElementById("c1").innerHTML;
var c2 = document.getElementById("c2").innerHTML;
var c3 = document.getElementById("c3").innerHTML;
var stateArr = [a1,a2,a3,b1,b2,b3,c1,c2,c3];
var stateArrVars = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2","c3"];

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

    if(isOccupied(cellId)) {
        return;
    }

    if((turns%2) == 0) {
        drawO(cellId);
        turns += 1;
        winPatternSymbol("O");
    } else {
        drawX(cellId);
        turns += 1;
        winPatternSymbol("X");
    }
    evaluate();

    playRandom();

}

function AIPlay(cellId) {

    if(winPattern()) return;
    if((turns%2) == 0) {
        drawO(cellId);
        winPatternSymbol("O");
        turns += 1;

    } else {
        drawX(cellId);
        winPatternSymbol("X");
        turns += 1;
    }
    evaluate();

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

function winPattern() {

    var pattern = false;

    var a1 = document.getElementById("a1").innerHTML;
    var a2 = document.getElementById("a2").innerHTML;
    var a3 = document.getElementById("a3").innerHTML;
    var b1 = document.getElementById("b1").innerHTML;
    var b2 = document.getElementById("b2").innerHTML;
    var b3 = document.getElementById("b3").innerHTML;
    var c1 = document.getElementById("c1").innerHTML;
    var c2 = document.getElementById("c2").innerHTML;
    var c3 = document.getElementById("c3").innerHTML;

    if (a1 == b2 && b2 == c3 && b2 != "") {
        pattern = true;
        return pattern;
    }

    if (a3 == b2 && b2 == c1 && b2 != "") {
        pattern = true;
        return pattern;
    }

    if (a1 == a2 && a2 == a3 && a1 != ""||b1 == b2 && b2 == b3 && b1 != ""||c1 == c2 && c2 == c3 && c1 != "") {
        pattern = true;
        return pattern;
    }

    if (a1 == b1 && b1 == c1 && a1 != ""||a2 == b2 && b2 == c2 && a2 != ""||a3 == b3  && b3 == c3 && a3 != "") {
        pattern = true;
        return pattern;
    }

}

function evaluateWinPattern(board) {

    var pattern = false;

    var a1 = board[0];
    var a2 = board[1];
    var a3 = board[2];
    var b1 = board[3];
    var b2 = board[4];
    var b3 = board[5];
    var c1 = board[6];
    var c2 = board[7];
    var c3 = board[8];

    if (a1 == b2 && b2 == c3 && b2 != "") {
        pattern = true;
    }

    if (a3 == b2 && b2 == c1 && b2 != "") {
        pattern = true;
    }

    if (a1 == a2 && a2 == a3 && a1 != ""||b1 == b2 && b2 == b3 && b1 != ""||c1 == c2 && c2 == c3 && c1 != "") {
        pattern = true;
    }

    if (a1 == b1 && b1 == c1 && a1 != ""||a2 == b2 && b2 == c2 && a2 != ""||a3 == b3  && b3 == c3 && a3 != "") {
        pattern = true;
    }

    if(pattern) {
        if(turns%2 == 0) {
            return -10;
        } else {
            return 10;
        }
    }

    return 0;

}

function winPatternSymbol(symbol) {

    if(winPattern()) {
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

    }

}

function isFull() {

    for(let i=0; i<9; ++i) {

        var tacArr = document.getElementsByClassName("tc")[i].innerHTML;
        if (tacArr == "" ) return false;

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

function evaluate() {

    var board = [];
    for(let i=0; i<9; ++i) {
        var sym = document.getElementById(stateArrVars[i]).innerHTML;
        board.push(sym);
    }
    var score = evaluateWinPattern(board);
    console.log(score);console.log(board);


}