'use strict';

/**
 * This class represents the game.
 * Now it has a basic structure, that is needed for testing.
 * Feel free to add more props and methods if needed.
 */
class Game {
  /**
   * Creates a new game instance.
   *
   * @param {number[][]} initialState
   * The initial state of the board.
   * @default
   * [[0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0]]
   *
   * If passed, the board will be initialized with the provided
   * initial state.
   */
  constructor(initialState) {
    this.initialState = initialState;
    this.currentState = initialState.map((el) => [...el]);
  }

  createNewCell(moveDone = true) {
    if (!moveDone) {
      return;
    }

    let row, cell;

    do {
      row = Math.floor(Math.random() * 4);
      cell = Math.floor(Math.random() * 4);
    } while (this.currentState[row][cell] !== 0);

    const tbody = document.querySelector('tbody');
    const newCell = tbody.children[row].children[cell];

    newCell.classList.add('field-cell--2');
    newCell.textContent = '2';
    this.currentState[row][cell] = 2;
    newCell.style.color = 'red'; //delete after debug
  }

  clearCell(cell) {
    cell.className = 'field-cell';
    cell.textContent = '';
  }

  moveLeft() {}
  moveRight() {}
  moveUp() {}
  moveDown() {
    const tbody = document.querySelector('tbody');
    let moveDone = false;

    for (let row = 2; row >= 0; row--) {
      for (let cell = 0; cell < 4; cell++) {
        let currentCell = this.currentState[row][cell];

        if (currentCell === 0) {
          continue;
        }

        let lowerCell = this.currentState[row + 1][cell];
        let n = 1;
        let k = 0;

        while (lowerCell === 0 && row + n < 4) {
          moveDone = true;
          lowerCell = currentCell;

          const currentCellTd = tbody.children[row + k].children[cell];
          this.clearCell(currentCellTd);

          const lowerCellTd = tbody.children[row + n].children[cell];

          lowerCellTd.textContent = lowerCell;
          lowerCellTd.className = 'field-cell';
          lowerCellTd.classList.add(`field-cell--${lowerCell}`);
          lowerCellTd.style.color = ''; //delete after debug
          this.currentState[row + n][cell] = lowerCell;
          this.currentState[row + k][cell] = 0;

          n++;
          k++;

          if (row + k < 3) {
            currentCell = this.currentState[row + k][cell];
          }

          if (row + n < 4) {
            lowerCell = this.currentState[row + n][cell];
          }
        }

        // if (lowerCell === currentCell) {
        //   moveDone = true;
        //   lowerCell = currentCell * 2;
        //   currentCell = tbody.children[row].children[cell];
        //   this.clearCell(currentCell);

        //   const lowerCellTd = tbody.children[row + 1].children[cell];

        //   lowerCellTd.textContent = lowerCell;
        //   lowerCellTd.className = 'field-cell';
        //   lowerCellTd.classList.add(`field-cell--${lowerCell}`);
        //   this.currentState[row + 1][cell] = lowerCell;
        //   this.currentState[row][cell] = 0;
        // }
      }
    }
    this.createNewCell(moveDone);
  }

  /**
   * @returns {number}
   */
  getScore() {
    this.scoreField = document.querySelector('game-score');
    this.score = 0;
  }

  /**
   * @returns {number[][]}
   */
  getState() {}

  /**
   * Returns the current game status.
   *
   * @returns {string} One of: 'idle', 'playing', 'win', 'lose'
   *
   * `idle` - the game has not started yet (the initial state);
   * `playing` - the game is in progress;
   * `win` - the game is won;
   * `lose` - the game is lost
   */
  getStatus() {}

  /**
   * Starts the game.
   */
  start() {
    this.createNewCell();
    document.querySelector('.message-start').classList.add('hidden');
  }

  /**
   * Resets the game.
   */
  restart() {
    this.currentState = this.initialState;

    const cells = [...document.querySelectorAll('td')];

    cells.forEach(this.clearCell);
    this.createNewCell();
  }

  // Add your own methods here
}

module.exports = Game;
