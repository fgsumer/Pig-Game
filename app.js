let roundScore, activePlayer, scores, gamePlaying, lastDice, lastDice2;
init();

document.getElementById('dice-1').style.display = 'none';
document.getElementById('dice-2').style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    // 1- get random number
    let dice = Math.floor(Math.random() * 6) + 1;

    // 2- display result on dice
    let diceDom = document.getElementById('dice-1');
    diceDom.style.display = 'block';
    diceDom.src = './images/dice-' + dice + '.png';

    let dice2 = Math.floor(Math.random() * 6) + 1;

    // 2- display result on dice
    let diceDom2 = document.getElementById('dice-2');
    diceDom2.style.display = 'block';
    diceDom2.src = './images/dice-' + dice2 + '.png';

    if ((lastDice === 6 && dice === 6) || (lastDice2 === 6 && dice2 === 6)) {
      scores[activePlayer] = 0;
      document.getElementById('score-' + activePlayer).textContent = '0';
    } else if (dice !== 1 && dice6 !== 1) {
      // update the round score if the random is not 1
      // add score
      roundScore += dice + dice2;
      // update current score part
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }

    lastDice = dice;
    lastDice2 = dice2;
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
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
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

  document.getElementById('current-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

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
