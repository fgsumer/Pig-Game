/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// if I use (Math.random() * 6).toFixed() instead of Math.floor(Math.random() * 6), it gives string and it doesn't calculate scores
// gamePlaying is the state function
let roundScore, activePlayer, scores, gamePlaying, lastDice;
init();

document.querySelector('.dice').style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    // 1- get random number
    let dice = Math.floor(Math.random() * 6) + 1;
    // alert('hurray!!!' + dice);
    // 2- display result on dice
    let diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = './images/dice-' + dice + '.png';

    if (lastDice === 6 && dice === 6) {
      scores[activePlayer] = 0;
      document.getElementById('score-' + activePlayer).textContent = '0';
    } else if (dice !== 1) {
      // 3- update the round score if the random is not 1
      // add score
      roundScore += dice;
      // update current score part
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // change the active player = next player
      nextPlayer();
    }
    // it should be at the end of
    lastDice = dice;
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    // add current score to global score
    scores[activePlayer] += roundScore;
    // visible to UI
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    let input = document.querySelector('.final-score').value;
    let winningScore;

    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }
    // check if the player won
    if (scores[activePlayer] >= winningScore) {
      document.getElementById('name-' + activePlayer).textContent = 'winner!';
      // alert(activePlayer + ' is the winner of the game');
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  // make it visible to UI as well
  document.getElementById('current-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';

  // toggle the class = add if it is not there, if it is there remove it
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  // make the dice invisible when it change the player
  document.querySelector('.dice').style.display = 'none';
}

// we are passing init as an argument, not calling it here. callback function
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  roundScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
