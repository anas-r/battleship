import {Ship} from "./Models/Ship";

export const BOARD_SIZE = 10;
export const PLACEHOLDER = '_'
export const EMPTY_ARRAY = Array(BOARD_SIZE).fill(PLACEHOLDER);

export const HUMAN_PLAYERNAME = 'anas';
export const COMPUTER_PLAYERNAME = 'cpu';

export const _randomDirection = () => {
    return (Math.random() * 2 >> 0 === 0)
}

export const _random = () => {
    return Math.random() * BOARD_SIZE >> 0
}

export const _generateShipsArray = (k=0) => {
    return [
        new Ship(5+k, _randomDirection(), 'A'),
        new Ship(4, _randomDirection(), 'B'),
        new Ship(3, _randomDirection(), 'C'),
        new Ship(3, _randomDirection(), 'D'),
        new Ship(2, _randomDirection(), 'E')
    ]
}

export const $ = (selector) => document.querySelector(selector);
export const $_ = (tag, className = "", id) => {
    const el = document.createElement(tag);
    el.className = className;
    if (id) el.id = id;
    return el
}