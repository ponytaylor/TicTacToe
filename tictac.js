var playerIsX=true;
var btns = document.getElementsByTagName("button");
var waitTimer = null;
var newgame = true;


for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        //console.log(this.id);
        if (this.id == "playerX"){
            playerIsX = true;
            this.classList.remove("reject");
            this.classList.add("chosen");
            document.getElementById("playerO").classList.add("reject");
            document.getElementById("playerO").classList.remove("chosen");
        }
        if (this.id == "playerO"){
            playerIsX = false;
            this.classList.remove("reject");
            this.classList.add("chosen");
            document.getElementById("playerX").classList.add("reject");
            document.getElementById("playerX").classList.remove("chosen");
        }
        document.getElementById("computer").innerHTML= playerIsX?"O":"X";

    });
}

document.getElementById("computer").innerHTML= playerIsX?"O":"X";
var gameArray = [[], [], []];

var boxes = document.getElementsByClassName("tictacbox");
var infodiv = document.getElementById("info");

function getSum(total, num) {
    return total + num;
}

function checkRows(){
    for (var r=0; r<3;r++){
        var rowSum = gameArray[r].reduce(getSum);
        if (rowSum < -1 || rowSum > 1){
            playRow(r);
            return true;
        }
    }
    return false;
}

function playTlBrDiag(){
    for (var r=0, c=0; r<3;r++, c++){
        if(gameArray[r][c] == 0){
            gameArray[r][c] = 1;
            var boxId = "r" + r + "c" + c;
            //console.log("playing", boxId);
            document.getElementById(boxId).innerHTML = playerIsX?"O":"X";
            document.getElementById(boxId).classList.add("done");
            document.getElementById(boxId).classList.add(playerIsX?"displayO":"displayX");
        }
        
    }
}

function playBlTrDiag(){
    for (var r=0, c=2; r<3;r++, c--){
        if(gameArray[r][c] == 0){
            gameArray[r][c] = 1;
            var boxId = "r" + r + "c" + c;
            //console.log("playing", boxId);
            document.getElementById(boxId).innerHTML = playerIsX?"O":"X";
            document.getElementById(boxId).classList.add("done");
            document.getElementById(boxId).classList.add(playerIsX?"displayO":"displayX");
        }
        
    }
}


function playAny(){
    for (var r=0; r<3;r++){
        for (var c=0; c<3;c++){
        if(gameArray[r][c] == 0){
            gameArray[r][c] = 1;
            var boxId = "r" + r + "c" + c ;
            //console.log("playing", boxId);
            document.getElementById(boxId).innerHTML = playerIsX?"O":"X";
            document.getElementById(boxId).classList.add("done");
            document.getElementById(boxId).classList.add(playerIsX?"displayO":"displayX");
            return;
        }
    }
    }
}

function checkDiags(){
    var diagSumTlBr = 0;
    for (var r=0, c=0; r<3;r++, c++){
        diagSumTlBr += gameArray[r][c];
    }
    var diagSumBlTr = 0;
    for (var r=0, c=2; r<3;r++, c--){
        diagSumBlTr += gameArray[r][c];
    }
    if(diagSumTlBr < -1 || diagSumTlBr > 1){
        playTlBrDiag();
        return true;
    }
    if(diagSumBlTr < -1 || diagSumBlTr > 1){
        playBlTrDiag();
        return true;
    }
    return false;
}

function checkCols(){
    for (var c=0; c<3;c++){
        var colSum = 0;
        colSum += gameArray[0][c];
        colSum += gameArray[1][c];
        colSum += gameArray[2][c];
        //console.log(c,colSum);
        if (colSum < -1 || colSum > 1){
            playCol(c);
            return true;
        }
    }
    return false;
}

function playRow(rowIndex){
    for (var c=0; c<3;c++){
        if(gameArray[rowIndex][c] == 0){
            gameArray[rowIndex][c] = 1;
            var boxId = "r" + rowIndex + "c" + c;
            //console.log("playing", boxId);
            document.getElementById(boxId).innerHTML = playerIsX?"O":"X";
            document.getElementById(boxId).classList.add("done");
            document.getElementById(boxId).classList.add(playerIsX?"displayO":"displayX");
        }
    }
}

function playCol(colIndex){
    for (var r=0; r<3;r++){
        if(gameArray[r][colIndex] == 0){
            gameArray[r][colIndex] = 1;
            var boxId = "r" + r + "c" + colIndex ;
            //console.log("playing", boxId);
            document.getElementById(boxId).innerHTML = playerIsX?"O":"X";
            document.getElementById(boxId).classList.add("done");
            document.getElementById(boxId).classList.add(playerIsX?"displayO":"displayX");
        }
    }
}

function checkForWin(){
    // check for row
    var out = "check for win: ";
    for (var r=0; r<3;r++){
        var rowSum = gameArray[r].reduce(getSum);
        out += "rowSum: " + rowSum + " ";
        if (rowSum == -3){
            playerWin();
            return true;
        }
        if(rowSum == 3){
            computerWin();
            return true;
        }
        
    }
    //check for col
    for (var c=0; c<3;c++){
        var colSum = 0;
        colSum += gameArray[0][c];
        colSum += gameArray[1][c];
        colSum += gameArray[2][c];
        out += "colSum: " + colSum + " ";
        if (colSum == -3){
            playerWin();
            return true;
        }
        if(colSum == 3){
            computerWin();
            return true;
        }
        
    }
    // check diag
    var diagSumTlBr = 0;
    for (var r=0, c=0; r<3;r++, c++){
        diagSumTlBr += gameArray[r][c];
    }
    if(diagSumTlBr == -3 ){
        playerWin();
        return true;
    }
    if(diagSumTlBr == 3 ){
        computerWin();
        return true;
    }
    out += "diagSumTlBr: " + diagSumTlBr + " ";
    var diagSumBlTr = 0;
    for (var r=0, c=2; r<3;r++, c--){
        diagSumBlTr += gameArray[r][c];
    }
    if(diagSumBlTr == -3){
        playerWin();
        return true;
    }
    if(diagSumBlTr == 3){
        computerWin();
        return true;
    }
    out += "diagSumBlTr: " + diagSumBlTr + " ";
    // check for tie
    var count = 0;
    for (var rr=0; rr<3;rr++){
        for(var cc=0; cc<3; cc++){
            if (gameArray[rr][cc] == 0){
                out += " - more to play";
                return false;
            }
            else{
                count++;
            }
        }
    }
    if (count == 9){
        tie();
        return true;
    }
    return false;
}

function tie(){
    infodiv.innerHTML = "You tied!";
}

function computerWin(){
    infodiv.innerHTML = "You lost!";
}


function playerWin(){
    infodiv.innerHTML = "You won!";
}



function computerPlay(){
    //console.log("computer play");
    var win = false;
    win = checkForWin();
    if(!win){
        var rowPlayed = checkRows();
        if(!rowPlayed){
            var colPlayed = checkCols();
            if(!colPlayed){
                // check diags
                var diagPlayed = checkDiags();
                if (!diagPlayed){
                    playAny();
                }
            }
        }
        win = checkForWin();
    }
   if (win){
    for (var i = 0; i < boxes.length; i++) {
        // clicking shouldn't do anything now
        boxes[i].classList.add("done");
     }
       // wait a bit
       waitTimer = setTimeout(function(){
        //console.log("restart game");
        gameArray = [[0,0,0], [0,0,0], [0,0,0]];
         // clear board
         for (var i = 0; i < boxes.length; i++) {
            boxes[i].innerHTML="";
            boxes[i].classList.remove("done");
            boxes[i].classList.remove("displayX");
            boxes[i].classList.remove("displayO");
            infodiv.innerHTML = " Your turn!";
         }
    }, 10000);
    
   }
}

document.getElementById("startgame").addEventListener("click", function(){
    //console.log("start game");
    if(waitTimer){
        clearTimeout(waitTimer);
    }
    gameArray = [[0,0,0], [0,0,0], [0,0,0]];
     // clear board
     for (var i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML="";
        boxes[i].classList.remove("done");
        boxes[i].classList.remove("displayX");
        boxes[i].classList.remove("displayO");
     }
     
     if(newgame){
         setUpListeners();
         newgame = false;
     }
    });

function setUpListeners(){
     // set up listeners
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("click", function() {
            //console.log("click", this.id);
            if( !this.classList.contains("done")){
                // set as player choice
                this.classList.add(playerIsX?"displayX":"displayO");
                this.innerHTML = playerIsX?"X":"O";
                this.classList.add("done");
                var row = this.id[1];
                var col = this.id[3];
                gameArray[row][col] = -1;
                computerPlay();
            }
         });
    }
   
    // indicate player turn
    infodiv.innerHTML = " Your turn!";
 }