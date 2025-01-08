let score = JSON.parse(localStorage.getItem('score')) ||  {
    win : 0,
    lose : 0,
    tie : 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

document.querySelector('.js-auto-play').addEventListener('click',() => {
    autoPlay();
});

document.querySelector('.js-reset').addEventListener('click',() => {
    let html = `
        Are you sure want to reset the score? 
        <button onclick = "resetScore()" class = "js-yes">Yes</button>
        <button onclick = "document.querySelector('.js-message').innerHTML = '';" class = "js-no">No</button>
        `;
    document.querySelector('.js-message').innerHTML = html;
});

function resetScore(){
    score.win = 0;
    score.lose = 0;
    score.tie = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    document.querySelector('.js-message').innerHTML = '';
}

function autoPlay(){
    if(!isAutoPlaying){
        intervalId = setInterval(() => {
            let playerMove = pickComputerMove();
            playgame(playerMove);
        }, 1000);
        document.querySelector('.js-auto-play').innerHTML = 'Stop Playing';
        isAutoPlaying = true;
    }
    else {
        clearInterval(intervalId);
        document.querySelector('.js-auto-play').innerHTML = 'Auto Playing';
        isAutoPlaying = false;
    }
    
}

document.querySelector('.js-rock-button').addEventListener('click',() => {
    playgame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click',() => {
    playgame('Paper');
});

document.querySelector('.js-scissors-button').addEventListener('click',() => {
    playgame('Scissors');
});

document.body.addEventListener('keydown',(event) => {
    if(event.key === 'r'){
        playgame('Rock');
    }
    else if(event.key === 'p'){
        playgame('Paper');
    }
    else if(event.key === 's'){
        playgame('Scissors');
    }
    else if(event.key === 'a'){
        autoPlay();
    }
    else if(event.key === 'Backspace'){
        score.win = 0;
        score.lose = 0;
        score.tie = 0;
        localStorage.removeItem('score');
        updateScoreElement();
    }
});

function playgame(playerMove){
    const computerMove = pickComputerMove();
    let result = '';


    if(playerMove === 'Rock'){
        if(computerMove === 'Rock'){
            result = 'Tie';
            score.tie += 1;
        }
        else if (computerMove === 'Paper'){
            result = 'You lose';
            score.lose += 1;
        }
        else if (computerMove === 'Scissors'){
            result = 'You win';
            score.win +=1;
        }
    }

    if(playerMove === 'Paper'){
        if(computerMove === 'Rock'){
            result = 'You win';
            score.win += 1;
        }
        
        else if (computerMove === 'Paper'){
            result = 'Tie';
            score.tie += 1;
       }
        else if (computerMove === 'Scissors'){
            result = 'You lose';
            score.lose += 1;
        }
    }

    if(playerMove === 'Scissors'){
        if(computerMove === 'Rock'){
            result = 'You lose';
            score.lose += 1;
        }
        else if (computerMove === 'Paper'){
            result = 'You win';
            score.win += 1;
        }
        else if (computerMove === 'Scissors'){
            result = 'Tie';
            score.tie += 1;
        }
    }

    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `
    You 
    <img src="images/${playerMove}.png" alt="">
    <img src="images/${computerMove}.png" alt="">
    Computer`;

    updateScoreElement();

    /*    alert(`You choose ${playerMove}. Computer choose ${computerMove}. ${result}
    Win: ${score.win}    Lose: ${score.lose}    Tie: ${score.tie}
    `); */

}

function updateScoreElement(){
    document.querySelector('.js-score').innerHTML = `Wins: ${score.win}    Looses: ${score.lose}    Ties: ${score.tie}`;
}

function pickComputerMove(){
    const randomNumber = Math.random();
    let computerMove = '';

    if(randomNumber > 0 && randomNumber <= 1/3){
        computerMove = 'Rock';
}
    else if(randomNumber > 1/3 && randomNumber <= 2/3){
        computerMove = 'Paper';
}
    else if(randomNumber > 2/3 && randomNumber <= 1){
        computerMove = 'Scissors';
}
    return computerMove;
}