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
    } else {
        drawX(cellId);
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