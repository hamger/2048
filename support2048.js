/**
* Created by HanGuang on 16-11-3.
**/
function getPosTop(i, j) {
    return 20 + i * 120;
}

function getPosLeft(i, j) {
    return 20 + j * 120;
}

function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return '#eee4da';
            break;
        case 4:
            return '#ede0c8';
            break;
        case 8:
            return '#f2b179';
            break;
        case 16:
            return '#f59563';
            break;
        case 32:
            return '#f67c5f';
            break;
        case 64:
            return '#f65e3b';
            break;
        case 128:
            return '#edcf72';
            break;
        case 256:
            return '#edcc61';
            break;
        case 512:
            return '#9c0';
            break;
        case 1024:
            return '#33b5e5';
            break;
        case 2048:
            return '#0c9';
            break;
        case 4096:
            return '#a6c';
            break;
        case 8192:
            return '#93c';
            break;
    }
    return 'black';
}

function getNumberColor(number) {
    if (number <= 4)
        return '#776e65'

    return 'white'
}

function hasSpace(board) { //是否有空位
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return true;
            }
        }
    }
    return false;

}

function canMoveLeft(board) { //是否可以左移
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) { //判断该单元格是否显示数字
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false
}

function canMoveRight(board) { //是否可以右移
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) { //判断该单元格是否显示数字
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false
}


function canMoveUp(board) { //是否可以上移
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) { //判断该单元格是否显示数字
                if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false
}
function canMoveDown(board) { //是否可以上移
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >=0; i--) {
            if (board[i][j] != 0) { //判断该单元格是否显示数字
                if (board[i+1][j] == 0 || board[i+1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false
}

function noBlockHorizontal(row, col1, col2, board) { //是否存在水平障碍物
    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] != 0) {
            return false;
        }
    }
    return true
}


function noBlockVertical( col , row1 , row2 , board ){
    for( var i = row1 + 1 ; i < row2 ; i ++ )
        if( board[i][col] != 0 ){
            return false;
        }
    return true;
}

function nomove(board){
    if (canMoveDown(board)||
        canMoveUp(board)||
        canMoveRight(board)||
        canMoveLeft(board)) {
        return false;
    }
    return true;
}