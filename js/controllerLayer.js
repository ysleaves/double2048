/**
 * Created by leaves on 2015/11/2.
 */
function startGame(cxt)
{
    init(cxt);
    init1(cxt);
    score = 0;
    updateScore(score);
    context.beginPath();
    newBox(cxt);
    newBox(cxt);
    newBox1(cxt);
    newBox1(cxt);
}

function newBox(cxt){
    if (noSpace())
    {
        return false;
    }
    var randx = parseInt(Math.floor(Math.random()*4));
    var randy = parseInt(Math.floor(Math.random()*4));

    var times = 0;
    while(times < 50){
        if(nums[randx][randy] == 0)
        {
            break;
        }
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));

        times++;
    }

    if(times==50)
    {
        for(var i = 0; i< 4 ; i++)
        {
            for(var j = 0; j< 4 ; j++ )
            {
                if(nums[i][j]==0){
                    randx = i;
                    randy = j;
                }
            }
        }
    }

    var randNumber = Math.random() < 0.5? 2:4;

    nums[randx][randy] = randNumber;
    drawBox(cxt, randx, randy, randNumber);
    return true;
}

function newBox1(cxt)
{
    if (noSpace())
    {
        return false;
    }
    var randx = parseInt(Math.floor(Math.random()*4));
    var randy = parseInt(Math.floor(Math.random()*4));

    var times = 0;
    while(times < 50){
        if(nums[randx][randy] == 0)
        {
            break;
        }
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));

        times++;
    }

    if(times==50)
    {
        for(var i = 0;i< 4 ; i++)
        {
            for(var j = 0; j< 4 ;j++ )
            {
                if(nums[i][j]==0){
                    randx = i;
                    randy =j ;
                }
            }
        }
    }

    var randNumber = Math.random() < 0.9? 2:4;

    nums[randx][randy] = randNumber;
    drawBox1(cxt, randx, randy, randNumber);
    return true;
}

function moveKeyDown()
{
    event.preventDefault();
    switch (event.keyCode)
    {
        case 37://left
            if(moveLeft())
            {
                context.beginPath();
                newBox(context);
                context.beginPath();
                newBox1(context);
                isGameOver();
            }
            break;

        case 38://up
            if(moveUp())
        {
            context.beginPath();
            newBox(context);
            context.beginPath();
            newBox1(context);
            isGameOver();
        }
            break;

        case 39://right
            if(moveRight())
        {
            context.beginPath();
            newBox(context);
            context.beginPath();
            newBox1(context);
            isGameOver();
        }
            break;

        case 40://down
            if(moveDown())
        {
            context.beginPath();
            newBox(context);
            context.beginPath();
            newBox1(context);
            isGameOver();
        }
            break;

        default :
            break;
    }
}

document.addEventListener('touchstart',function(event)
{
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY
});

document.addEventListener('touchend',function(event)
{
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;

    var daltaX = endX - startX;
    var daltaY = endY - startY;

    if(Math.abs(daltaX) < 0.2 * documentWidth && Math.abs(daltaY) < 0.2 * documentWidth)
        return ;

    if(Math.abs(daltaX) >= Math.abs(daltaY))
    {
        if(daltaX < 0)
        {
            if (moveLeft())
            { //为空或者相等
                context.beginPath();
                newBox(context);
                context.beginPath();
                newBox1(context);
                isGameOver();
            }
        }else
        {
            if (moveRight())
            {
                context.beginPath();
                newBox(context);
                context.beginPath();
                newBox1(context);
                isGameOver();
            }
        }
    }else
    {
        if(daltaY < 0)
        {
            if (moveUp())
            {
                context.beginPath();
                newBox(context);
                context.beginPath();
                newBox1(context);
                isGameOver();
            }
        }else
        {
            if (moveDown() )
            {
                context.beginPath();
                newBox(context);
                context.beginPath();
                newBox1(context);
                isGameOver();
            }
        }
    }
});

function moveLeft()
{
    if(!canMoveLeft())
    {
        return false;
    }
    for(var j = 0 ; j < 4 ; j++)
    {
        for(var i = 1 ; i < 4 ; i++)
        {
            if(nums[i][j]!=0)
            {
                for(var k = 0 ; k<i ; k++)
                {
                    if(nums[k][j]==0)
                    {
                        nums[k][j] = nums[i][j];
                        nums[i][j] = 0 ;
                    }
                    else if(nums[k][j]==nums[i][j] && noBlockHorizontal(j , k ,i , nums))
                    {
                        nums[k][j] = nums[i][j] + nums[k][j];
                        nums[i][j] = 0;
                        score = score + nums[k][j];
                        updateScore(score);
                    }
                }
            }
        }
    }
    updateBoardView(context);
    updateBoardView1(context);
    return true;
}

function canMoveLeft()
{
    for(var j = 0 ; j < 4 ; j++)
    {
        for(var i = 1 ; i < 4 ; i++)
        {
            if(nums[i][j]!=0)
            {
                if(nums[i-1][j]==0 || nums[i-1][j]==nums[i][j])
                {
                    return true;
                }
            }
        }
    }
    return false;
}

function moveRight()
{
    if(!canMoveRight())
    {
        return false;
    }
    for(var j = 0 ; j < 4 ; j++)
    {
        for(var i = 2 ; i >=0 ; i--)
        {
            if(nums[i][j]!=0)
            {
                for(var k = 3 ; k > i ; k--)
                {
                    if(nums[k][j]==0 && noBlockHorizontal(j, i, k, nums))
                    {
                        nums[k][j] = nums[i][j];
                        nums[i][j] = 0;
                    }
                    else if(nums[i][j]==nums[k][j] && noBlockHorizontal(j , i ,k , nums))
                    {
                        nums[k][j] = nums[i][j] + nums[k][j];
                        nums[i][j] = 0;
                        score = score + nums[k][j];
                        updateScore(score);
                    }
                }
            }
        }
    }
    updateBoardView(context);
    updateBoardView1(context);
    return true;
}

function canMoveRight()
{
    for(var j = 0 ; j < 4 ; j++)
    {
        for(var i =2 ; i >=0 ; i--)
        {
            if(nums[i][j]!=0)
            {
                if(nums[i+1][j]==0 || nums[i+1][j]==nums[i][j])
                {
                    return true;
                }
            }
        }
    }
    return false;
}

function moveUp()
{
    if(!canMoveUp())
    {
        return false;
    }
    for(var i = 0 ; i < 4 ; i++)
    {
        for(var j = 1 ; j < 4 ; j++)
        {
            if(nums[i][j]!=0)
            {
                for(var k = 0 ; k<j ; k++)
                {
                    if(nums[i][k]==0)
                    {
                        nums[i][k] = nums[i][j];
                        nums[i][j] = 0 ;
                    }
                    else if(nums[i][k]==nums[i][j] && noBlockVertical(i , k ,j , nums))
                    {
                        nums[i][k] = nums[i][j] + nums[i][k];
                        nums[i][j] = 0;
                        score = score + nums[i][k];
                        updateScore(score);
                    }
                }
            }
        }
    }
    updateBoardView(context);
    updateBoardView1(context);
    return true;
}

function canMoveUp()
{
    for(var i = 0 ; i < 4 ; i++)
    {
        for(var j = 1 ; j < 4 ; j++)
        {
            if(nums[i][j]!=0)
            {
                if(nums[i][j-1]==0 || nums[i][j-1]==nums[i][j])
                {
                    return true;
                }
            }
        }
    }
    return false;
}

function moveDown()
{
    if(!canMoveDown())
    {
        return false;
    }
    for(var i = 0 ; i < 4 ; i++)
    {
        for(var j = 2 ; j >=0 ; j--)
        {
            if(nums[i][j]!=0)
            {
                for(var k = 3 ; k > j ; k--)
                {
                    if(nums[i][k]==0 && noBlockVertical(i , j ,k , nums))
                    {
                        nums[i][k] = nums[i][j];
                        nums[i][j] = 0 ;
                    }
                    else if(nums[i][j]==nums[i][k] && noBlockVertical(i , j ,k , nums))
                    {
                        nums[i][k] = nums[i][j] + nums[i][k];
                        nums[i][j] = 0;
                        score = score + nums[i][k];
                        updateScore(score);
                    }
                }
            }
        }
    }
    updateBoardView(context);
    updateBoardView1(context);
    return true;
}

function canMoveDown()
{
    for(var i = 0 ; i < 4 ; i++)
    {
        for(var j = 2 ; j >=0 ; j--)
        {
            if(nums[i][j]!=0)
            {
                if(nums[i][j+1]==0 || nums[i][j+1]==nums[i][j])
                {
                    return true;
                }
            }
        }
    }
    return false;
}


function noBlockVertical(col, row1, row2, nums)
{
    for (var i = row1 + 1; i < row2; i++){
        if (nums[col][i] != 0){
            return false;
        }
    }
    return true;
}

function noBlockHorizontal(row, col1, col2, nums)
{
    for (var i = col1 + 1; i < col2; i++) {
        if (nums[i][row] != 0) {
            return false;
        }
    }
    return true;
}

function updateScore(score)
{
    document.getElementById("score").innerText = score;
}


function noSpace()
{
    for(var i=0 ; i <4 ; i++){
        for(var j=0; j<4 ; j++){
            if(nums[i][j]==0)
                return false
        }
    }
    return true
}

function noMove()
{
    if (canMoveLeft() || canMoveRight() || canMoveUp() || canMoveDown())
        return false;

    return true;
}

function isGameOver()
{
    if (noMove() && noSpace())
    {
        alert("GameOver.Score:" + score);
        return true;
    }
    return false;
}


