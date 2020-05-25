import {_random, BOARD_SIZE, PLACEHOLDER} from "../_utils";

export class GameSide {
    board;
    sunkShips;

    constructor(player, board) {
        this.playerName = player;
        this.sunkShips = 0;
        this.board = board;
    }

    getPlayerName = () => {
        return this.playerName;
    }

    _isCaseEmpty = (i, j) => {
        return (this.board.array[i][j] === PLACEHOLDER)
    }

    _isAlreadyHit = (i, j) => {
        return (this.board.array[i][j] === 'X')
    }

    hit = (i, j) => {
        if (this._isCaseEmpty(i, j)) {
            this.board.array[i][j] = 'X';
            return [false, {hitType: 'miss'}];
        } else {
            if (this._isAlreadyHit(i, j)) {
                return [false, false];
            } else {
                const hitShip = this.board.ships.filter(ship => ship.placeholder === this.board.array[i][j])[0];
                this.board.array[i][j] = 'X';
                hitShip.markHit();

                if (hitShip.isSunk()) {
                    this.sunkShips++;
                    console.log(`${hitShip.placeholder} ship was sunk!`)
                }
                return [hitShip, {hitType: 'hit', shipType: hitShip.placeholder, shipSunk: hitShip.isSunk()}];
            }
        }
    }

    _test = () => {
        while (!this.isGameOver()) {
            let [i, j] = [_random(), _random()]
            let potentialShip = this.hit(i, j)[1];
            while (!potentialShip) {
                [i, j] = [_random(), _random()];
                potentialShip = this.hit(i, j)[1];
            }
        }
    }

    isGameOver = () => {
        return (this.sunkShips >= this.board.ships.length)
    }
}