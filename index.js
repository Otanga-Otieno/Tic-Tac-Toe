var turns = 1;

function drawX(cell) {

    var tablecell = document.getElementById(cell);
    tablecell.innerHTML = "X";

}

function drawO(cell) {

    var tablecell = document.getElementById(cell);
    tablecell.innerHTML = "O";

}

function play(cellId) {

    if((turns%2) == 0) {
        drawO(cellId);
        turns += 1;
    } else {
        drawX(cellId);
        turns += 1;
    }

}