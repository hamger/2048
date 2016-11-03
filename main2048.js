/**
 * Created by HanGuang on 16-11-3.
 **/

var board = new Array();
var score = 0;

$(document).ready(function() {
    newgame();
})

function newgame() {
    // 初始化棋盘格
    init()
        // 在随机两个格子生成数字
    generateOneNumber()
    generateOneNumber()
}

function init() {
    for (var i = 0; i < 4; i++) { //gridCell定位
        for (var j = 0; j < 4; j++) {
            var gridCell = $('#grid-cell-' + i + '-' + j);
            gridCell.css('top', getPosTop(i, j))
            gridCell.css('left', getPosLeft(i, j))
        }
    }
    for (var i = 0; i < 4; i++) { //gridCell赋值
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    updateBoardView(); //更新网格
    score = 0;
}



function updateBoardView() { //根据board[i][j]的值 对前端数据进行操作    
    $('.number-cell').remove()
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {

            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>')
            var theNumberCell = $('#number-cell-' + i + '-' + j)

            if (board[i][j] == 0) {
                theNumberCell.css('width', "0px")
                theNumberCell.css('height', "0px")
                theNumberCell.css('top', getPosTop(i, j) + 50)
                theNumberCell.css('left', getPosLeft(i, j) + 50)
            } else {
                theNumberCell.css('width', '100px')
                theNumberCell.css('height', '100px')
                theNumberCell.css('top', getPosTop(i, j))
                theNumberCell.css('left', getPosLeft(i, j))
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]))
                theNumberCell.css('color', getNumberColor(board[i][j]))
                theNumberCell.text(board[i][j])
            }
        }
    }
}

function generateOneNumber() {
    if (!hasSpace(board)) { //判断是否有空位
        return false;
    }
    //随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    while (true) {
        if (board[randx][randy] == 0)
            break;

        var randx = parseInt(Math.floor(Math.random() * 4));
        var randy = parseInt(Math.floor(Math.random() * 4));
    }

    //随机一个数字
    var randomNumber = Math.random() < 0.5 ? 2 : 4;

    //随机位置显示随机数字
    board[randx][randy] = randomNumber;
    showNumberWithAnimation(randx, randy, randomNumber);

    return true;
}


$(document).keydown(function(event) {
    switch (event.keyCode) {
        case 37: // left
            event.preventDefault()
            if (moveleft()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }

            break;
        case 38: // up
            event.preventDefault()

            if (moveup()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 39: // right
            event.preventDefault()

            if (moveright()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 40: // down
            event.preventDefault()

            if (movedown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        default:
            break;
    }
})

function isgameover() {
    if (!hasSpace(board) && nomove(board)) {
        gameover();
    }
}

function gameover() {
    alert('gameover!');
}

function moveleft(){

    if( !canMoveLeft( board ) )
        return false;

    //moveLeft
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 1 ; j < 4 ; j ++ ){
            if( board[i][j] != 0 ){

                for( var k = 0 ; k < j ; k ++ ){
                    if( board[i][k] == 0 && noBlockHorizontal( i , k , j , board ) ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i , k , j , board ) ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore( score );

                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveright(){
    if( !canMoveRight( board ) )
        return false;

    //moveRight
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2 ; j >= 0 ; j -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > j ; k -- ){

                    if( board[i][k] == 0 && noBlockHorizontal( i , j , k , board ) ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board ) ){
                        //move
                        showMoveAnimation( i , j , i , k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore( score );

                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveup(){

    if( !canMoveUp( board ) )
        return false;

    //moveUp
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ ){
            if( board[i][j] != 0 ){
                for( var k = 0 ; k < i ; k ++ ){

                    if( board[k][j] == 0 && noBlockVertical( j , k , i , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , k , i , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore( score );

                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function movedown(){
    if( !canMoveDown( board ) )
        return false;

    //moveDown
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , i , k , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore( score );

                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}