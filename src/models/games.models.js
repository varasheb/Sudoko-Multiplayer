export const isValidSudokuMove = (board,row,col, value) => {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === value || board[x][col] === value) {
            return false;
        }
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
  
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === value) return false;
        }
    }
    return true;
};

export function generateBoard(level) {
    const completeBoard = generateCompleteBoard();
    removeNumbers(completeBoard, level);
    return completeBoard;
}

function solveSudoku(board) {
    const empty = findEmptyLocation(board);
    if (!empty) return true;
    const [row, col] = empty;
    for (let num = 1; num <= 9; num++) {
        if (isValidSudokuMove(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) return true;
            board[row][col] = 0; 
        }
    }
    return false;
}

function findEmptyLocation(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) return [row, col];
        }
    }
    return null;
}

function generateCompleteBoard() {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));
    solveSudoku(board);
    return board;
}

function removeNumbers(board, level) {
    let attempts;
    switch (level) {
        case 'easy':
            attempts = 30;
            break;
        case 'medium':
            attempts = 40;
            break;
        case 'hard':
            attempts = 50;
            break;
        case 'evil':
            attempts = 60;
            break;
        default:
            throw new Error('Invalid difficulty level');
    }

    while (attempts > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (board[row][col] !== 0) {
            board[row][col] = 0;
            attempts--;
        }
    }
}




