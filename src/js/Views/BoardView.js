import {$, $_, BOARD_SIZE, COMPUTER_PLAYERNAME} from "../_utils";

export class BoardView {
    constructor(boardSize = BOARD_SIZE, playerNameHandler) {
        this.nodelist = [];
        this.playerName = playerNameHandler();
        this.playerNameDom = $_('h3');
        this.playerNameDom.textContent = `${this.playerName}: board`;
        this.dom = $_('div', 'board')
        for (let i = 0; i < boardSize; i++) {
            const nodesLine = [];
            for (let j = 0; j < boardSize; j++) {
                const oneCase = $_('div', 'board-case', `${this.playerName}-${i}-${j}`);
                this.dom.append(oneCase);
                nodesLine.push(oneCase);
            }
            this.nodelist.push(nodesLine);
        }
    }

    mount(rootElement) {
        rootElement.append(this.playerNameDom, this.dom);
    }

    bindInitialSetUpColors = (handler) => {
        if (this.playerName === COMPUTER_PLAYERNAME) {
            return false;
        }
        const board = handler();
        board.array.forEach((line, i) => line.forEach((x, j) => {
            (!board.isCaseEmpty(i, j)) && (this.markCase(i, j, 'initial'))
        }))
        return true;
    }

    markCase = (i, j, action) => {
        const markedCase = document.getElementById(`${this.playerName}-${i}-${j}`);
        switch (action) {
            case 'initial' :
                markedCase.classList.add("initial");
                return true;
            case 'hit' :
                markedCase.classList.add("hit");
                return true;
            case 'miss' :
                markedCase.classList.add("miss");
                return true;
            default:
                return false;
        }
    }

    bindCheckGameOver = (callback) => {
        this.checkGameOver = callback
    }

    bindTriggerComputer = (callback) => {
        this.triggerComputer = callback;
    }

    bindHitCase = (handler) => {
        this.dom.addEventListener('click', (e) => {
            if (this.checkGameOver()
                || e.target.closest('.board-human')
                || !e.target.className.includes('board-case')
                || e.target.className.includes('hit')
                || e.target.className.includes('miss')) {
                console.log("Illegal move")
                return false;
            } else {
                let [whoAffected, i, j] = e.target.id.split('-');
                if (!handler(i, j)) {
                    this.triggerComputer();
                }
            }
        })
    }
}