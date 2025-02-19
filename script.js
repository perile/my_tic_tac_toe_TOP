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

const button = document.querySelectorAll("button");


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

    const sayHi = function(){
        return `Hi! My name is ${name}`;
    };
    const returnMarker = function(){
        return marker;
    };

    return {name, returnMarker};
};


(function() {

    const player1 = player();
    const player2 = player();
    const game = gameBoard();

    let decideWhoPlaysFirst = Math.floor(Math.random() * 2);

    let flow = true
    // let row;
    // let column;
    while(flow == true){
        game.showGameBoard();
        if(decideWhoPlaysFirst == 0){

            //player1 turn 
            console.log(`${player1.name}, it's your turn`);
            //let row = prompt("From 1 to 3, what row will you choose?");
            //let column = prompt("From 1 to 3, what column will you choose?");
            flow = game.checkIfMoveLegal(player1) == true ? false : true;
            if(flow == false) {break;}

            //player2 turn
            game.showGameBoard();
            console.log(`${player2.name}, it's your turn`);
            // row = prompt("From 1 to 3, what row will you choose?");
            // column = prompt("From 1 to 3, what column will you choose?");
            flow = game.checkIfMoveLegal(player2) == true ? false : true;
            if(flow == false) {break;}

        }else{

            //player2 turn
            console.log(`${player2.name}, it's your turn`);
            // let row = prompt("From 1 to 3, what row will you choose?");
            // let column = prompt("From 1 to 3, what column will you choose?");
            flow = game.checkIfMoveLegal(player2) == true ? false : true;
            if(flow == false) {break;}

            //player1 turn
            game.showGameBoard();
            console.log(`${player1.name}, it's your turn`);
            // row = prompt("From 1 to 3, what row will you choose?");
            // column = prompt("From 1 to 3, what column will you choose?");
            flow = game.checkIfMoveLegal(player1) == true ? false : true;
            if(flow == false) {break;}

        }
    }

    console.log("The game is over!!")

})()


function buttonEvents(player){
    // const adderAndRemover = () => {
    //     this.textContent = player.returnMarker();
    //     // this.removeEventListener("click")
        
    // }
    let rowID = 0;
    let columnID = 0;
    button.forEach((elem) => {
        elem.dataset.row = rowID++;
        elem.dataset.column = columnID++;
        elem.addEventListener("click", () =>{
            elem.textContent = player.returnMarker();
            elem.disabled = true;
        })
    })
}




/*TESTS*/

// const button = document.querySelectorAll("button");
// button.forEach((elem) => {
//     elem.addEventListener("click", () =>{
//         console.log("You have clicked me.")
//         elem.disabled = true;
//     })
// })

/*TESTS*/