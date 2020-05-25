import {COMPUTER_PLAYERNAME, HUMAN_PLAYERNAME} from "../_utils";

export class GameManager {
    constructor(gamepvc) {
        this.gamepvc = gamepvc
    }

    getHumanPlayerName = () => {
        return this.gamepvc.getHumanPlayerName();
    }

    getComputerName = () => {
        return this.gamepvc.getComputerName();
    }

    getPlayerReference = (playerName) => {
        return this.gamepvc.getPlayerReference(playerName);
    }

    initialSetUp = (playerName) => {
        return this.getPlayerReference(playerName).board;
    }

    bindHumanCaseMarker = (callback) => {
        this.onHumanMarkCase = callback;
    }

    bindComputerCaseMarker = (callback) => {
        this.onComputerMarkCase = callback;
    }

    bindMessageSetter = (callback) => {
        this.onSetMessage = callback;
    }

    onResetMessage = () => {
        this.onSetMessage('')
    }

    checkGameOver = () => {
        return this.gamepvc.isOver();
    }

    triggerComputer = () =>  {
        return this.markCase(HUMAN_PLAYERNAME)
    }

    markCase = (whoAffected, i, j) => {
        if (whoAffected === COMPUTER_PLAYERNAME) {
            let [action, isWinner] = this.gamepvc.humanPlaysDetails(i, j);
            this.onComputerMarkCase(i, j, action.hitType);

            if (isWinner) {
                this.onSetMessage(`Game over! ${whoAffected} lost!`)
                return true;
            } else if (action.shipSunk) {
                this.onSetMessage(`${action.shipType} of ${whoAffected} has sunk!`)
            } else {
                this.onResetMessage()
            }
            return false;

        } else if (whoAffected === HUMAN_PLAYERNAME) {
            let [I, J, action, isWinner] = this.gamepvc.computerPlaysDetails();
            this.onHumanMarkCase(I, J, action.hitType);

            if (isWinner) {
                this.onSetMessage(`Game over! ${whoAffected} lost!`)
                return true;
            } else if (action.shipSunk) {
                this.onSetMessage(`${action.shipType} of ${whoAffected} has sunk!`)
            } else {
                this.onResetMessage()
            }
            return false;
        }
    }

}