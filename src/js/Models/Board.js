import {_random, BOARD_SIZE, EMPTY_ARRAY, PLACEHOLDER} from "../_utils";

export class Board {
    array;

    constructor(ships) {
        this.array = []
        this.ships = [...ships]
        for (let i = 0; i < BOARD_SIZE; i++) this.array.push([...EMPTY_ARRAY])
        this.placeShips();
    }

    flip = () => {
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = i + 1; j < BOARD_SIZE; j++) {
                [this.array[i][j], this.array[j][i]] = [this.array[j][i], this.array[i][j]]
            }
        }
        return this
    }

    isFreeArray = array => {
        return !(array.findIndex(c => c !== PLACEHOLDER) > -1)
    }

    isCaseEmpty = (i,j) => {
        return (this.array[i][j] === PLACEHOLDER)
    }

    checkLineRoomForLength = (lineIndex, ship) => {
        if (ship.length > BOARD_SIZE)
            return false;
        const line = this.array[lineIndex];
        const possibilitiesForLength = []
        for (let i = 0; i < (BOARD_SIZE - ship.length) + 1; i++) {
            possibilitiesForLength.push(line.slice(i, i + ship.length))
        }
        while (possibilitiesForLength[0]) {
            if (this.isFreeArray(possibilitiesForLength[0])) {
                return true;
            } else {
                possibilitiesForLength.shift()
            }
        }
        return false;
    }

    _placeShipRandomHelper(lineIndex, ship, flip = false) {
        if (!(this.checkLineRoomForLength(lineIndex, ship))) {
            return false;
        }
        const line = this.array[lineIndex];
        const maxIndex = (BOARD_SIZE - ship.length) + 1;
        let randomIndex = Math.random() * maxIndex >> 0;
        while (!this.isFreeArray(line.slice(randomIndex, randomIndex + ship.length))) {
            randomIndex = Math.random() * maxIndex >> 0;
        }
        line.forEach((x, i) => {
            if (i >= randomIndex && i < randomIndex + ship.length) {
                line[i] = ship.placeholder;
            }
        })
        if (flip) {
            this.flip();
        }
        return true;
    }

    placeShipRandom(lineIndex, ship) {
        if (ship.horizontal) {
            return this._placeShipRandomHelper(lineIndex, ship);
        } else if (ship.horizontal === false) {
            this.flip();
            if (this._placeShipRandomHelper(lineIndex, ship, true)) {
                return true;
            } else {
                this.flip();
                return false;
            }
        } else {
            return false;
        }
    }

    placeShips = () => {
        this.ships.forEach(ship => {
            let randomIndex = _random();
            while (!this.placeShipRandom(randomIndex, ship)) {
                randomIndex = _random();
            }
            return true;
        })
    }
}