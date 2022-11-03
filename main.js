const jsConfetti = new JSConfetti()

const config = {
  emojis: ['🦄', '🌈', '⚡️', '💥', '✨', '💫', '🌸'],
  emojiSize: 100,
  confettiNumber: 30,
}

window.addEventListener('DOMContentLoaded', () => {
  const tile = Array.from(document.querySelectorAll('.tile'));
  const playerDisplay = document.querySelector('#display-player');
  const resetButton = document.querySelector('#reset');
  const announcer = document.querySelector('.announcer');
  
  let board = ['', '', '', '', '', '', '', '', '',];
  let currentPlayer = 'X';
  let isGameActive = true;
  
  const PLAYERX_WON = 'PLAYERX_WON';
  const PLAYERO_WON = 'PLAYERO_WON';
  const TIE = 'TIE';
  
  playerDisplay.innerText = currentPlayer;
  
  /*
  index within the board
  [0] [1] [2]
  [3] [4] [5]
  [6] [7] [8]
  */
  
  const winningconditions = [
    [0, 1, 2,],
    [3, 4, 5,],
    [6, 7, 8,],
    [0, 3, 6,],
    [1, 4, 7,],
    [2, 5, 8,],
    [0, 4, 8,],
    [2, 4, 6,]
    ];
    // let winCondition ='O'
    function handleResultValidation(){
    let roundWon = false;
      for ( let i = 0; i < winningconditions.length; i++){
        const winCondition = winningconditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        
        if (a === '' || b === '' || c ===''){
          continue;
        }
        if (a === b && b === c){
          roundWon = true;
          break;
        }
      }
      if (roundWon) {
        announce(currentPlayer === 'X' ?  PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return;
      }
      if (!board.includes('') )
      announce(TIE)
    }
    
    const announce =(type)=>{switch(type){
      case PLAYERO_WON:
        announcer.innerHTML='Player <span class="PLAYERO">O</span> won';
           jsConfetti.addConfetti(config);
        break;
      case PLAYERX_WON:
        announcer.innerHTML='Player <span class="PLAYERX">X</span> won';
           jsConfetti.addConfetti(config);
        break;
        case TIE:
          announcer.innerText='Tie';
        }
        announcer.classList.remove('hide');
        
    };
    const isValidAction = (tile) => {
      if (tile.innerText === 'X' || tile.innerText === 'O'){
        return false;
      }
      return true;
    };
    
    const updateBoard = (index) => {
      board[index] = currentPlayer;
      console.log(board);
    }
    
    const changePlayer = () => {
      playerDisplay.classList.remove(`player${currentPlayer}`);
      
      if(currentPlayer === 'X') {
        currentPlayer = 'O'
      } else {
        currentPlayer = 'X'
      }
      
      playerDisplay.innerText = currentPlayer; 
      playerDisplay.classList.add(`player${currentPlayer}`);
    } 
    
    const userAction = (tile,index) => {
      if (isValidAction(tile) && isGameActive ) {
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
      }
    };
    const resetBoard = () => {
      board = ['', '', '', '', '', '', '', '', '',];
      isGameActive = true;
      announcer.classList.add('hide');
      
      if (currentPlayer === 'O'){
        changePlayer();
      }
      tile.forEach(tile => {
        tile.innerText = '';
        tile.classList.remove('playerX');
        tile.classList.remove('playerO');
      });
    }
    
    tile.forEach( (tile, index) => {
      tile.addEventListener('click',() => userAction(tile,index));
    })
  
  resetButton.addEventListener('click',resetBoard);
} );
