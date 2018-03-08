var documentWidth = window.screen.availWidth;
var gridContainerWidth = documentWidth * 0.92;
var cellSpace = 0.04 * documentWidth;
var cellLength = 0.2 * documentWidth;
if (documentWidth > 500) {
    gridContainerWidth = 500;
    cellSpace = 20;
    cellLength = 100;
}

$('#grid-container').css('width', gridContainerWidth - 2 * cellSpace);
$('#grid-container').css('height', gridContainerWidth - 2 * cellSpace);
$('#grid-container').css('padding', cellSpace);
$('#grid-container').css('border-radius', 0.02 * gridContainerWidth);

$('.grid-cell').css('width', cellLength);
$('.grid-cell').css('height', cellLength);
$('.grid-cell').css('border-radius', 0.02 * cellLength);

// 表示盒子背景色的对象
var bgColors = {
    2: "#eee4da",
    4: "#ede0c8",
    8: "#f2b179",
    16: "#f59563",
    32: "#f67c5f",
    64: "#f65e3b",
    128: "#edcf72",
    256: "#edcc61",
    512: "#9c0",
    1024: "#33b5e5",
    2048: "#09c",
    4096: "#a6c",
    8192: "#93c"
};

/* 获取某个盒子的top */
function getTop(i, j) {
    return cellSpace + i * (cellSpace + cellLength);
}

/* 获取某个盒子的left */
function getLeft(i, j) {
    return cellSpace + j * (cellSpace + cellLength);
}

/* 规定不同数字盒子的背景颜色 */
function getBgColor(number) {
    return bgColors[number];
}

/* 规定不同数字盒子的字体颜色 */
function getColor(number) {
    if (number <= 4) return "#776e65";
    return "white";
}

/* 显示数字 */
function showNumber(i, j, randNumber) {
    var numberCell = $('#number-cell-' + i + "-" + j);
    numberCell.css('background-color', getBgColor(randNumber));
    numberCell.css('color', getColor(randNumber));
    numberCell.text(randNumber);
    numberCell.animate({
        width: cellLength,
        height: cellLength,
        top: getTop(i, j),
        left: getLeft(i, j)
    }, 100);
}

/* 是否没有空格 */
function nospace(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] == 0) return false;
    return true;
}

/* 是否不能移动 */
function nomove(board) {
    if (canMoveLeft(board) ||
        canMoveRight(board) ||
        canMoveUp(board) ||
        canMoveDown(board)) {
        return false;
    }
    return true;
}

/* 移动盒子的动画 */
function showMoveAnimation(fx, fy, tx, ty) {
    var numberCell = $('#number-cell-' + fx + '-' + fy);
    numberCell.animate({
        top: getTop(tx, ty),
        left: getLeft(tx, ty)
    }, 200);
}

/* 水平方向是否没有阻碍 */
function noBlockHorizontal(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++)
        if (board[row][i] != 0)
            return false;
    return true;
}

/* 垂直方向是否没有阻碍 */
function noBlockVertical(col, row1, row2, board) {
    for (var i = row1 + 1; i < row2; i++)
        if (board[i][col] != 0)
            return false;
    return true;
}

/* 能否左移 */
function canMoveLeft(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++)
            if (board[i][j] != 0)
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j])
                    return true;
    return false;
}

/* 能否右移 */
function canMoveRight(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--)
            if (board[i][j] != 0)
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j])
                    return true;

    return false;
}

/* 能否上移 */
function canMoveUp(board) {
    for (var j = 0; j < 4; j++)
        for (var i = 1; i < 4; i++)
            if (board[i][j] != 0)
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j])
                    return true;
    return false;
}

/* 能否下移 */
function canMoveDown(board) {
    for (var j = 0; j < 4; j++)
        for (var i = 2; i >= 0; i--)
            if (board[i][j] != 0)
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j])
                    return true;
    return false;
}

/* 更新分数 */
function updateScore(score) {
    $('#score').text(score);
}
