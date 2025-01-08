let score = JSON.parse(localStorage.getItem('score')) || {
    wins : 0,
    losses : 0,
    ties : 0
    };
    
    updateScoreElement();

    let isAutoPlaying = false;
    let intervalId;

    document.querySelector('.auto-play-button').addEventListener('click',() =>{
        autoPlay();
    });

    function autoPlay(){
      if(!isAutoPlaying){
        intervalId = setInterval(() => {
          const playerMove = pickComputerMove();
          playGame(playerMove);
          document.querySelector('.auto-play-button').innerHTML = 'Stop Playing';
        },1000)
        isAutoPlaying = true;
      } else{
        document.querySelector('.auto-play-button').innerHTML = 'Auto Play';
        clearInterval(intervalId);
        isAutoPlaying = false;
      }
      
    }
    
    document.querySelector('.reset-score-button').addEventListener('click', () => {
      resetScore();
    });

    document.querySelector('.js-rock-button').addEventListener('click', () => {
      playGame('rock');
    });
    document.querySelector('.js-scissors-button').addEventListener('click', () => {
      playGame('scissors');
    });
    document.querySelector('.js-paper-button').addEventListener('click', () => {
      playGame('paper');
    });
    document.body.addEventListener('keydown',(event) => {
      if(event.key === 'r'){
        playGame('rock');
      } 
      else if(event.key === 'p'){
        playGame('paper');
      }
      else if(event.key === 's'){
        playGame('scissors');
      }
      else if(event.key === 'a'){
        autoPlay();
      }
      else if(event.key === 'Backspace'){
        resetScore();
      }

    });

    function resetScore(){
      resetConformation();
    }

    function resetConformation(){
      let resetConformation = document.querySelector('.js-reset-conformation');
      resetConformation.innerHTML = `
      Are you sure you want to reset the score 
      <button class = "js-reset-conformation-yes">Yes</button>
      <button class = "js-reset-conformation-no">No</button>
      `;
      document.querySelector('.js-reset-conformation-yes').addEventListener('click',() => {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
        hideConformation();
      });

      document.querySelector('.js-reset-conformation-no').addEventListener('click',() => {
        hideConformation();
      });
    }

    function hideConformation(){
      document.querySelector('.js-reset-conformation').innerHTML = '';
    }
  
    function playGame (playerMove){
      const computerMove = pickComputerMove ();
  
      let result = '';
      if (playerMove === 'scissors'){
        if (computerMove === 'rock') {
          result = 'You lose';
        }
        else if (computerMove === 'paper'){
          result = 'You win';
        }
        else if (computerMove === 'scissors'){
          result = 'Tie';
        }
      }
  
      else if (playerMove === 'paper'){
        if (computerMove === 'rock') {
        result = 'You win';
      }
        else if (computerMove === 'paper'){
          result = 'Tie';
        }
        else if (computerMove === 'scissors'){
          result = 'You lose';
        }
      }
      
      else if (playerMove === 'rock'){
        if (computerMove === 'rock') {
        result = 'Tie';
      }
      else if (computerMove === 'paper'){
        result = 'You lose';
      }
      else if (computerMove === 'scissors'){
        result = 'You win';
      }
      }
  
      if (result === 'You win'){
        score.wins += 1;
      }
      else if (result === 'You lose'){
        score.losses += 1;
      }
      else if (result === 'Tie'){
        score.ties += 1;
      } 
  
      localStorage.setItem('score',JSON.stringify(score));
  
      updateScoreElement();
  
      document.querySelector('.js-result').innerHTML = `${result}`;
  
      document.querySelector('.js-move').innerHTML = `You 
       <img src="images/${playerMove}.png" class="move-icon">
       <img src="images/${computerMove}.png" class="move-icon">
       Computer`;
    }
  
    function updateScoreElement(){
      document.querySelector('.js-score').innerHTML = `Wins : ${score.wins}, Losses : ${score.losses}, Ties : ${score.ties}`;
    }
  
    function pickComputerMove () {
      const randomNumber = Math.random();
      let computerMove = '';
  
      if (randomNumber >= 0 && randomNumber <1/3) {
        computerMove = 'rock';
      }
      else if (randomNumber >= 1/3 && randomNumber <2/3) {
        computerMove = 'paper';
      }
      else if (randomNumber >= 2/3 && randomNumber <1) {
        computerMove = 'scissors';
      }
      return computerMove;
    }