/*GLOBAL VARIABLES */
const sliderGame = document.querySelector(".sliderGame");
const play = document.querySelector(".play");
const container = document.querySelector(".container");
const displayer = document.querySelector(".displayer");
const buttons = document.querySelectorAll(".square");
const restartGame = document.querySelector(".restartGame")
let players;
let decideWhoPlaysFirst;


/*PLAY AND RESTART BUTTONS CONTROLLERS*/
play.addEventListener("click", () => {
    sliderGame.style.visibility = "hidden";
    container.style.visibility = "visible";
    displayer.style.visibility = "visible";
    initializer();
})

restartGame.addEventListener("click", () =>{
    restartGame.style.visibility = "hidden";
    buttons.forEach((elem) => {
        elem.disabled = false;
        elem.textContent = "";
    })
    initializer();
})


function gameBoard() {
    let arr = [[".", ".", "."],[".", ".", "."],[".", ".", "."]];

    const showGameBoard = function(){
        console.log(`${arr[0]}\n${arr[1]}\n${arr[2]}\n`);
    }

    const checkIfWon = function(player){
        if(
            //VICTORY CHECK
            //horizontal check
            arr[0][0] == player.returnMarker() && arr[0][1] == player.returnMarker() && arr[0][2] == player.returnMarker()||
            arr[1][0] == player.returnMarker() && arr[1][1] == player.returnMarker() && arr[1][2] == player.returnMarker()||
            arr[2][0] == player.returnMarker() && arr[2][1] == player.returnMarker() && arr[2][2] == player.returnMarker()||
            //vertical check
            arr[0][0] == player.returnMarker() && arr[1][0] == player.returnMarker() && arr[2][0] == player.returnMarker()||
            arr[0][1] == player.returnMarker() && arr[1][1] == player.returnMarker() && arr[2][1] == player.returnMarker()||
            arr[0][2] == player.returnMarker() && arr[1][2] == player.returnMarker() && arr[2][2] == player.returnMarker()||
            //diagonal check
            arr[0][0] == player.returnMarker() && arr[1][1] == player.returnMarker() && arr[2][2] == player.returnMarker()||
            arr[0][2] == player.returnMarker() && arr[1][1] == player.returnMarker() && arr[2][0] == player.returnMarker()
        ){
            console.log(`${player.name} with the marker ${player.returnMarker()} has won the game!`);
            displayer.textContent = `GAME OVER! ${players[0].name} has won the game!`;
            restartGame.style.visibility = "visible";
            return true;
        }else if(
            //DRAW CHECK
            arr[0][0] != "." &&
            arr[0][1] != "." &&
            arr[0][2] != "." &&
            arr[1][0] != "." &&
            arr[1][1] != "." &&
            arr[1][2] != "." &&
            arr[2][0] != "." &&
            arr[2][1] != "." &&
            arr[2][2] != "."
        ){
            displayer.textContent = `The game is a draw!`;
            restartGame.style.visibility = "visible";
            return true;
        }else{
            return false;
        };
    };

    const checkIfMoveLegal = function(player, button){
        let rowID = button.dataset.row;
        let columnID = button.dataset.column;
        arr[rowID][columnID] = player.returnMarker();
        return checkIfWon(player) == true ? true : false;  
    }

    const returnGameBoard = () => arr;

    return {arr, showGameBoard, checkIfMoveLegal, returnGameBoard};
}


function player(){
    const name = String(prompt("What is your name?"));
    const marker = String(prompt("What is your marker?"));

    const returnMarker = function(){
        return marker;
    };

    return {name, returnMarker};
};


function initializer() {
    players = [];
    decideWhoPlaysFirst = Math.floor(Math.random() * 2);

    if(decideWhoPlaysFirst == 0){
        const player1 = player();
        const player2 = player();
        players.push(player1, player2);
        displayer.textContent = `${player1.name}, it's your turn.`;
    }else{
        const player1 = player();
        const player2 = player();
        players.push(player2, player1);
        displayer.textContent = `${player2.name}, it's your turn.`;
        
    }

    decideWhoPlaysFirst = 0;
    const game = gameBoard();

    (function(){
        let rowID = 0;
        let columnID = 0;

        buttons.forEach((elem) => {
            if(columnID < 3){
                elem.dataset.row = rowID;
                elem.dataset.column = columnID;
                columnID++;
            }else{
                rowID++;
                columnID = 0;
                elem.dataset.row = rowID;
                elem.dataset.column = columnID;
                columnID++;
            }

            elem.addEventListener("click", () => {
                if(elem.textContent == ""){
                    if(decideWhoPlaysFirst == 0){
                        elem.textContent = players[0].returnMarker();
                        let x = game.checkIfMoveLegal(players[0], elem);
                        if(x == false){
                            displayer.textContent = `${players[1].name}, it's your turn`;
                            decideWhoPlaysFirst++;
                            elem.disabled = true;
                        }
                    }else{
                        elem.textContent = players[1].returnMarker();
                        let x = game.checkIfMoveLegal(players[1], elem);
                        if(x == false){
                            displayer.textContent = `${players[0].name}, it's your turn`;
                            decideWhoPlaysFirst--;
                            elem.disabled = true;
                        }
                    }
                }
            })

        })
    })();
}