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

  nextMovePossible() {
    return this.currentState.some((row, rowIndex) => {
      return row.some((cell, cellIndex) => {
        let upperCell, lowerCell;
        const rightCell = row[cellIndex + 1];
        const leftCell = row[cellIndex - 1];

        if (rowIndex < 3) {
          lowerCell = this.currentState[rowIndex + 1][cellIndex];
        }

        if (rowIndex > 0) {
          upperCell = this.currentState[rowIndex - 1][cellIndex];
        }

        const zeroValue = [lowerCell, upperCell, leftCell, rightCell].some(
          (el) => el === 0,
        );
        const sameValue = [lowerCell, upperCell, leftCell, rightCell].some(
          (el) => el === cell,
        );
        const possibleForCell = zeroValue || sameValue;

        return possibleForCell;
      });
    });
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
    const fullField = this.currentState.every((row) => {
      return row.every((cell) => cell !== 0);
    });

    if (fullField) {
      return;
    }

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

  moveLeft() {
    let moveDone = false;

    this.currentState.forEach((row) => {
      row.forEach((cell, cellIndex) => {
        if (cell === 0 || cellIndex === 0) {
          return;
        }

        let n = 0;
        let currentCell = row[cellIndex - n];
        let leftCell = row[cellIndex - n - 1];

        while (leftCell === 0 || leftCell === currentCell) {
          moveDone = true;

          if (leftCell === 0) {
            row[cellIndex - n - 1] = currentCell;
            row[cellIndex - n] = 0;

            n++;

            if (cellIndex - n > 0) {
              currentCell = row[cellIndex - n];
              leftCell = row[cellIndex - n - 1];
            } else {
              return;
            }
          } else {
            row[cellIndex - n - 1] = currentCell * 2;
            row[cellIndex - n] = 0;
            this.score += currentCell * 2;
            this.getScore();

            return;
          }
        }
      });
    });

    if (moveDone) {
      this.createNewCell();
      this.renderHTML();
      this.getStatus();
    }
  }

  moveRight() {
    let moveDone = false;

    for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
      for (let cellIndex = 2; cellIndex >= 0; cellIndex--) {
        let currentCell = this.currentState[rowIndex][cellIndex];

        if (currentCell === 0) {
          continue;
        }

        let n = 0;
        let rightCell = this.currentState[rowIndex][cellIndex + n + 1];

        while (rightCell === 0 || rightCell === currentCell) {
          moveDone = true;

          if (rightCell === 0) {
            this.currentState[rowIndex][cellIndex + n + 1] = currentCell;
            this.currentState[rowIndex][cellIndex + n] = 0;

            n++;

            if (rowIndex - n > 0) {
              currentCell = this.currentState[rowIndex][cellIndex + n];
              rightCell = this.currentState[rowIndex][cellIndex + n + 1];
            } else {
              break;
            }
          } else {
            this.currentState[rowIndex][cellIndex + n + 1] = currentCell * 2;
            this.currentState[rowIndex][cellIndex + n] = 0;
            this.score += currentCell * 2;
            this.getScore();
            break;
          }
        }
      }
    }

    if (moveDone) {
      this.createNewCell();
      this.renderHTML();
      this.getStatus();
    }
  }
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
      this.createNewCell();
      this.renderHTML();
      this.getStatus();
    }
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
      this.createNewCell();
      this.renderHTML();
      this.getStatus();
    }
  }

  /**
   * @returns {number}
   */
  getScore() {
    const scoreField = document.querySelector('.game-score');

    scoreField.textContent = this.score;

    return this.score;
  }

  /**
   * @returns {number[][]}
   */
  getState() {
    return this.currentState;
  }

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
    const emptyField = this.currentState.every((row) => {
      return row.every((cell) => cell === 0);
    });

    if (emptyField) {
      return 'idle';
    }

    const is2048 = this.currentState.some((row) => {
      return row.some((cell) => cell === 2048);
    });

    if (is2048) {
      document.querySelector('.message-win').classList.remove('hidden');

      return 'win';
    }

    if (!this.nextMovePossible()) {
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
}

module.exports = Game;
