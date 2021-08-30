let table = document.getElementById('playTable');
let restartInputForm = document.getElementById('restartInputForm');
let clickNumber = 1;
let gameField = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let crossMarkName = 'cross-mark';
let zeroMarkName = 'zero-mark';
let isGameOver = false;
let isAutoGameRestartOn = true;
let gameWinnerId = '';

table.onclick = function (event) {

    if (isGameOver) {
        return;
    }

    let target = event.target.closest('.cross-mark, .zero-mark, td');
    let markClassName;
    let row = (target.id < 4) ? 0 : (target.id < 7) ? 1 : 2;
    let column = (target.id % 3 === 1) ? 0 : (target.id % 3 === 2) ? 1 : 2;
    let markName;

    if (!table.contains(target)) return;


    if (target.className === 'cross-mark') {
        return;
    } else if (target.className === 'zero-mark') {
        return;
    } else {
        markClassName = (clickNumber % 2 === 0) ? zeroMarkName : crossMarkName;
        markName = (clickNumber % 2 === 0) ? zeroMarkName : crossMarkName;
    }

    clickNumber++;
    target.classList.add(markClassName);
    updateGameField(row, column, markName);

    if (isWin(markName)) {
        isGameOver = true;
        let markId = (markName === 'cross-mark') ? 1 : (markName === 'zero-mark') ? 2 : 0;
        writeWinner(markId);

        if (isAutoGameRestartOn) {
            let restartButton = document.getElementById('restartButton');
            restartButton.disabled = true;
            setTimeout(restartGame, 2000);
        }
    }
}

restartInputForm.onchange = function () {
    isAutoGameRestartOn = !isAutoGameRestartOn;
}

function updateGameField(row, column, mark) {
    if (mark === crossMarkName) {
        gameField[row][column] = 1;
    } else if (mark === zeroMarkName) {
        gameField[row][column] = 2;
    }
}

function isWin(markName) {
    let markId = (markName === 'cross-mark') ? 1 : 2;

    return isWinVertically(markId) ||
        isWinHorizontally(markId) ||
        isWinDiagonally(markId) ||
        isWinDraw();

}

function isWinHorizontally(markId) {
    let countIdenticalInRow = 0;

    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            if (gameField[row][column] === markId) {
                countIdenticalInRow++;
            }
        }
        if (countIdenticalInRow === 3) {
            gameWinnerId = markId;
            return true;
        }
        countIdenticalInRow = 0;
    }

    return false;
}

function isWinVertically(markId) {
    let countIdenticalInColumn = 0;

    for (let column = 0; column < 3; column++) {
        for (let row = 0; row < 3; row++) {
            if (gameField[row][column] === markId) {
                countIdenticalInColumn++;
            }
        }
        if (countIdenticalInColumn === 3) {
            gameWinnerId = markId;
            return true;
        }
        countIdenticalInColumn = 0;
    }

    return false;
}

function isWinDiagonally(markId) {
    return isWinMainDiagonally(markId) ||
        isWinSideDiagonally(markId);
}

function isWinMainDiagonally(markId) {
    let countIdenticalInMainDiagonal = 0;

    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            if (row === column && gameField[row][column] === markId) {
                countIdenticalInMainDiagonal++;
            }
        }
    }

    if (countIdenticalInMainDiagonal === 3) {
        gameWinnerId = markId;
        return true;
    }

    return false;
}

function isWinSideDiagonally(markId) {
    let countIdenticalInSideDiagonal = 0;

    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            if (((row === 1 && column === 1) || (row === 0 && column === 2) || (row === 2 && column === 0))
                && gameField[row][column] === markId) {
                countIdenticalInSideDiagonal++;
            }
        }
    }

    if (countIdenticalInSideDiagonal === 3) {
        gameWinnerId = markId;
        return true;
    }

    return false;
}

function isWinDraw() {
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            if (gameField[row][column] === 0) {
                return false;
            }
        }
    }

    gameWinnerId = 0;
    return true;
}

function writeWinner() {
    let winnerString = document.getElementById('pWinnerString');
    let winner;

    if (gameWinnerId === 0) {
        winner = 'Draw';
    } else if (gameWinnerId === 1) {
        winner = 'Crosses';
    } else if (gameWinnerId === 2) {
        winner = 'Zeroes';
    }

    winnerString.innerHTML = `${winner} won!`;
}

function restartGame() {

    let rows = table.rows;
    let rowsCount = rows.length;

    for (let row = 0; row < rowsCount; row++) {
        let cells = rows[row].cells;
        let cellsCount = cells.length;

        for (let cell = 0; cell < cellsCount; cell++) {
            cells[cell].classList.remove('cross-mark', 'zero-mark');
        }
    }

    let winnerString = document.getElementById('pWinnerString');
    winnerString.innerHTML = '';

    let restartButton = document.getElementById('restartButton');
    restartButton.disabled = false;

    gameField = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    gameWinnerId = '';
    clickNumber = 1;
    isGameOver = false;

}
