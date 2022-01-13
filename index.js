var turns = 1;

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

    if ((a1 == b2) && (b2 == c3) && b2 != "") {
        pattern = true;
        return pattern;
    }

    if ((a3 == b2) && (b2 == c1) && b2 != "") {
        pattern = true;
        return pattern;
    }

}

function winPatternSymbol(symbol) {

    if(winPattern()) {
        var winnerSpan = document.getElementById("winner");
        var winsSpan = document.getElementById("wins");
        winnerSpan.innerHTML = symbol;
        winnerSpan.removeAttribute("hidden");
        winsSpan.removeAttribute("hidden");
    }

    if(symbol == "X") {
        winnerSpan.style.color = "blue";
    } else {
        winnerSpan.style.color = "red";
    }

}