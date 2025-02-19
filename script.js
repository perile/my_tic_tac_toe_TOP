/*
1 - O gameBoard vai ser um objecto que irá conter um array onde serão colocadas todas as peças dos jogadores.

Ex:
array[[], [], []]

Numa primeira fase, isto será tudo feito na consola, e o aspecto do board será o seguinte:


         c   c   c
         o   o   o
         l   l   l
         u   u   u
         n   n   n
         a   a   a
         1   2   3
Linha 1 ["", "", ""]
Linha 2 ["", "", ""]
Linha 3 ["", "", ""]

function gameBoard(){
    let array = [[], [], []];

    const placePiece = function(marker, x, y){
        array[x][y].push(marker);
    };

    return {array, placePiece}
}

Ou

let gameBoard = (function(){
    let array = [[], [], []];

    const placePiece = function(marker, x, y){
        array[x][y].push(marker);
    };

    return {array, placePiece}
})()



###################################################################
2 - Os jogadores serão objectos, em que podem escolher cada um o seu nome e a peça que quiserem.

O código pode ser algo do género (factory function???):
function player(name, marker){
    const sayHi = function(){
        console.log(`Hi! My name is ${name} and my marker is ${marker}.`);
    };

    const returnMarker = function(){
        return marker;
    };

    return {name, sayHi, returnMarker};
};

Isto seria para uma programação mais procedimental. Mas o código seguinte seria para que a escolha do nome e da peça fosse feita dentro da propria factory function, usando prompts:

function player(){
    const name = prompt("What is your name?");
    const marker = prompt("What is your marker?");

    const sayHi = () => `Hi! My name is ${name} and my marker is ${marker}.`
    const returnMarker = () => marker;

    return {name, returnMarker};
}

E a declaração pode ser tão simples como:

let player1 = player();
let player2 = player():

Pode ser que funcione. Aqui a ideia de se ter a função "returnMarker" seria para que quando o gameMaster pedisse ao jogador para posicionar a peça, que fosse usada a função para colocar o tipo de peça em questão.

###################################################################
3 - gameMaster, aquilo que irá controlar o fluxo do jogo

A função "gameMaster" irá controlar o fluxo do jogo. Isto significa que irá forçar a limpeza do campo de jogo quando se começar um jogo novo, irá determinar se um jogador já ganhou ou não, se é possível posicionar uma peça num dado local do array que é o campo de jogo, etc.

function gameMaster(){

    const escolherQuemJoga = function(){

    }

    const pedirParaJogar = function(){

    }

    ################################
    const checkLegalMove = function(){
        if(posição é legal){
            chamar função do gameBoard para posicionar a peça no array
        }else{
            pedir novamente para jogar
        }
    }

    OU
    
    const checkLegalMove = function(){
        while(){
            if(posição é legal){
                chamar função do gameBoard para posicionar a peça no array
            }
        }
    }
    ################################

    const verSeOJogadorGanhou = function(){
        se sim, então perguntar se é para repetir o jogo, limpar o campo, etc.
        se não, então nada acontece
    }
}



*/

/*GLOBAL VARIABLES */
const buttons = document.querySelectorAll("button");
const h1 = document.querySelector("h1");
let players = [];
let decideWhoPlaysFirst = 0;

/*GLOBAL VARIABLES */


function gameBoard() {
    let arr = [[".", ".", "."],[".", ".", "."],[".", ".", "."]];

    const showGameBoard = function(){
        console.log(`${arr[0]}\n${arr[1]}\n${arr[2]}\n`);
    }

    const checkIfWon = function(player){
        if(
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
            //add something more maybe
            return true;
        }else{
            console.log("Keep playing");
            return false;
        };
    };

    const checkIfMoveLegal = function(player, button){
        /*while(true){
            //let row = Number(prompt("From 1 to 3, what row will you choose?"));
            //let column = Number(prompt("From 1 to 3, what column will you choose?"));
            //if numbers are correct
            if(row >= 1 && row <= 3 && column >= 1 && column <= 3 && arr[row-1][column-1] == "."){
                row--;
                column--;
                //if there is nothing more than a dot (empty)
                arr[row][column] = player.returnMarker();
                //arr[row][column].push(player.returnMarker());
                return checkIfWon(player) == true ? true : false;
            }
            console.log("INVALID MOVE, TRY AGAIN!")
        }*/
        console.log(arr);
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
    //const turns = turn;

    const sayHi = function(){
        return `Hi! My name is ${name}`;
    };
    const returnMarker = function(){
        return marker;
    };
    //const returnTurn = () => turns;

    return {name, returnMarker, /*returnTurn*/};
};


function initializer() {
    // const buttons = document.querySelectorAll("button");
    // const h1 = document.querySelector("h1");
    //buttonEvents(buttons);

    decideWhoPlaysFirst = Math.floor(Math.random() * 2);
    // let whooseTurn = 0;
    // let players = [];
    if(decideWhoPlaysFirst == 0){
        const player1 = player();
        const player2 = player();
        players.push(player1, player2);
        h1.textContent = `${player1.name}, it's your turn.`;
    }else{
        const player1 = player();
        const player2 = player();
        players.push(player2, player1);
        h1.textContent = `${player2.name}, it's your turn.`;
        
    }
    decideWhoPlaysFirst = 0;
    const game = gameBoard();

    function buttonEvents(){
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
                        if(x == true){
                            h1.textContent = `GAME OVER! ${players[0].name} has won the game!`;
                        }else{
                            h1.textContent = `${players[1].name}, it's your turn`;
                            decideWhoPlaysFirst++;
                            elem.disabled = true;
                        }
                    }else{
                        elem.textContent = players[1].returnMarker();
                        let x = game.checkIfMoveLegal(players[1], elem);
                        if(x == true){
                            h1.textContent = `GAME OVER! ${players[1].name} has won the game!`;
                        }else{
                            h1.textContent = `${players[0].name}, it's your turn`;
                            decideWhoPlaysFirst--;
                            elem.disabled = true;
                        }
                    }
                }
            })

        })
    }
    buttonEvents();

}

/*
function buttonEvents(player1, player2, buttons, turn){
    let rowID = 0;
    let columnID = 0;

    buttons.forEach((elem) => {
        elem.dataset.row = rowID++;
        elem.dataset.column = columnID++;
        elem.addEventListener("click", () =>{
            if(turn == 0){
                if(player1.returnTurn == 0){
                    elem.textContent = player1.returnMarker();
                    
                    h1.textContent = `${player2.name}, it's your turn`;
                }else{
                    elem.textContent = player2.returnMarker();
                    h1.textContent = `${player1.name}, it's your turn`;
                }
            }else{
                if(player1.returnTurn == 1){
                    elem.textContent = player1.returnMarker();
                    h1.textContent = `${player2.name}, it's your turn`;
                }else{
                    elem.textContent = player2.returnMarker();
                    h1.textContent = `${player1.name}, it's your turn`;
                }
            }
            
            
            elem.disabled = true;
            
            /*if(turn == 0){
                
                turn++;
            }else{
                h1.textContent = `${player1.name}, it's your turn`;
                turn--
            }

        })
    })
}*/


initializer();

/*TESTS*/

// const button = document.querySelectorAll("button");
// button.forEach((elem) => {
//     elem.addEventListener("click", () =>{
//         console.log("You have clicked me.")
//         elem.disabled = true;
//     })
// })

/*TESTS*/