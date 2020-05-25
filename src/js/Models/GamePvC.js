import {_random, BOARD_SIZE} from "../_utils";

export class GamePvC {
    computer;
    computerMoves;
    human;
    _fakeHumanMoves;

    constructor(humanSide, computerSide) {
        this.human = humanSide;
        this.computer = computerSide;
        this._fakeHumanMoves = [];
        this.computerMoves = [];
    }

    getHumanPlayerName = () => {
        return this.human.getPlayerName();
    }

    getComputerName = () => {
        return this.computer.getPlayerName();
    }

    getPlayerReference = (playerName) => {
        if (playerName === this.getHumanPlayerName()) {
            return this.human;
        } else if (playerName === this.getComputerName()) {
            return this.computer;
        } else {
            return false;
        }
    }

    // For testing purposes.
    _fakeHumanPlays = () => {
        let [i, j] = [_random(), _random()];
        if (this._fakeHumanMoves.length === BOARD_SIZE ** 2) {
            return false;
        }
        while (this._fakeHumanMoves.includes(`${i} ${j}`)) {
            [i, j] = [_random(), _random()];
        }

        this._fakeHumanMoves.push(`${i} ${j}`);
        this.computer.hit(i, j);
        return (this.computer.isGameOver());
    }

    humanPlaysDetails = (i, j) => {
        const hitDetails = this.computer.hit(i, j)[1];
        return [hitDetails, (this.computer.isGameOver())];
    }

    humanPlays = (i, j) => {
        return this.humanPlaysDetails(i, j)[1];
    }

    computerPlaysDetails = () => {
        let [i, j] = [_random(), _random()];
        if (this.computerMoves.length === BOARD_SIZE ** 2) {
            return [false, false, false];
        }
        while (this.computerMoves.includes(`${i} ${j}`)) {
            [i, j] = [_random(), _random()];
        }

        this.computerMoves.push(`${i} ${j}`);
        const hitDetails = this.human.hit(i, j)[1];
        return [i, j, hitDetails, (this.human.isGameOver())];
    }

    // Randomly.
    computerPlays = () => {
        return this.computerPlaysDetails[2];
    }

    isOver = () => {
        return (this.human.isGameOver() || this.computer.isGameOver())
    }
}