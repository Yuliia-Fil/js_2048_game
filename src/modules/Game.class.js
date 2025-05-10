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
    this.tbody = document.querySelector('tbody');
    this.score = 0;
  }

  renderHTML() {
    this.currentState.forEach((row, rowIndex) => {
      const tr = this.tbody.children[rowIndex];
      const cells = [...tr.children];

      cells.forEach((cell, cellIndex) => {
        if (row[cellIndex] === 0) {
          this.clearCell(cell);
        } else {
          cell.textContent = row[cellIndex];
          cell.className = 'field-cell';
          cell.classList.add(`field-cell--${row[cellIndex]}`);
        }
      });
    });
  }

  createNewCell() {
    let rowIndex, cellIndex;

    do {
      rowIndex = Math.floor(Math.random() * 4);
      cellIndex = Math.floor(Math.random() * 4);
    } while (this.currentState[rowIndex][cellIndex] !== 0);

    this.currentState[rowIndex][cellIndex] = 2;
  }

  clearCell(cell) {
    cell.className = 'field-cell';
    cell.textContent = '';
  }

  moveLeft() {}
  moveRight() {}
  moveUp() {
    let moveDone = false;

    for (let rowIndex = 1; rowIndex < 4; rowIndex++) {
      for (let cellIndex = 0; cellIndex < 4; cellIndex++) {
        let currentCell = this.currentState[rowIndex][cellIndex];

        if (currentCell === 0) {
          continue;
        }

        let n = 0;
        let upperCell = this.currentState[rowIndex - n - 1][cellIndex];

        while (upperCell === 0 || upperCell === currentCell) {
          moveDone = true;

          if (upperCell === 0) {
            this.currentState[rowIndex - n - 1][cellIndex] = currentCell;
            this.currentState[rowIndex - n][cellIndex] = 0;

            n++;

            if (rowIndex - n > 0) {
              currentCell = this.currentState[rowIndex - n][cellIndex];
              upperCell = this.currentState[rowIndex - n - 1][cellIndex];
            } else {
              break;
            }
          } else {
            this.currentState[rowIndex - n - 1][cellIndex] = currentCell * 2;
            this.currentState[rowIndex - n][cellIndex] = 0;
            this.score += currentCell * 2;
            this.getScore();
            break;
          }
        }
      }
    }

    if (moveDone) {
      if (this.getStatus() === 'playing') {
        this.createNewCell();
      }
    }

    this.renderHTML();
  }
  moveDown() {
    let moveDone = false;

    for (let rowIndex = 2; rowIndex >= 0; rowIndex--) {
      for (let cellIndex = 0; cellIndex < 4; cellIndex++) {
        let currentCell = this.currentState[rowIndex][cellIndex];

        if (currentCell === 0) {
          continue;
        }

        let n = 0;
        let lowerCell = this.currentState[rowIndex + n + 1][cellIndex];

        while (lowerCell === 0 || lowerCell === currentCell) {
          moveDone = true;

          if (lowerCell === 0) {
            this.currentState[rowIndex + n + 1][cellIndex] = currentCell;
            this.currentState[rowIndex + n][cellIndex] = 0;

            n++;

            if (rowIndex + n < 3) {
              currentCell = this.currentState[rowIndex + n][cellIndex];
              lowerCell = this.currentState[rowIndex + n + 1][cellIndex];
            } else {
              break;
            }
          } else {
            this.currentState[rowIndex + n + 1][cellIndex] = currentCell * 2;
            this.currentState[rowIndex + n][cellIndex] = 0;
            this.score += currentCell * 2;
            this.getScore();
            break;
          }
        }
      }
    }

    if (moveDone) {
      if (this.getStatus() === 'playing') {
        this.createNewCell();
      }
    }

    this.renderHTML();
  }

  /**
   * @returns {number}
   */
  getScore() {
    const scoreField = document.querySelector('.game-score');

    scoreField.textContent = this.score;
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
  getStatus() {
    const fullField = this.currentState.every((row) => {
      return row.every((cell) => cell !== 0);
    });

    const is2048 = this.currentState.some((row) => {
      return row.some((cell) => cell === 2048);
    });

    if (is2048) {
      document.querySelector('.message-win').classList.remove('hidden');

      return 'win';
    }

    if (fullField) {
      document.querySelector('.message-lose').classList.remove('hidden');

      return 'lose';
    }

    return 'playing';
  }

  /**
   * Starts the game.
   */
  start() {
    this.createNewCell();
    this.renderHTML();
    document.querySelector('.message-start').classList.add('hidden');
  }

  /**
   * Resets the game.
   */
  restart() {
    document.querySelector('.message-win').classList.add('hidden');
    document.querySelector('.message-lose').classList.add('hidden');
    this.currentState = this.initialState.map((el) => [...el]);
    this.score = 0;
    this.getScore();
    this.createNewCell();
    this.renderHTML();
  }

  // Add your own methods here
}

module.exports = Game;
