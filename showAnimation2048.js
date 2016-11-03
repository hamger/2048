/**
* Created by HanGuang on 16-11-3.
**/
function showNumberWithAnimation(i, j, randNumber) { //动画显示格子
    var numberCell = $('#number-cell-' + i + '-' + j)

    numberCell.css('background-color', getNumberBackgroundColor(randNumber))
    numberCell.css('color', getNumberColor(randNumber))
    numberCell.text(randNumber)

    numberCell.animate({
        width: '100px',
        height: '100px',
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50)
}

function showMoveAnimation(fromx, fromy, tox, toy) { //动画移动格子
    var numberCell = $('#number-cell-' + fromx + '-' + fromy);
    numberCell.animate({
    	top:getPosTop(tox,toy),
    	left:getPosLeft(tox,toy)
    },200);
}

function updateScore( score ){
    $('#score').text( score );
}