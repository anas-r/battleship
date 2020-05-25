export class Ship {
    constructor(length, horizontal, placeholder, type) {
        this.length = length || 2
        this.horizontal = !!horizontal;
        this.placeholder = placeholder || 'O'
        this.type = type || 'Default';
        this.hits = 0;
    }

    markHit = () => {
        this.hits++;
    }

    isSunk = () => {
        return (this.hits >= this.length);
    }
}