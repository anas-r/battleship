import {$, HUMAN_PLAYERNAME} from "../_utils";

export class BoardController {
    constructor(view, gameManager,mountDOM = $('#root'),infoView) {
        this.view = view;
        this.gameManager = gameManager;
        this.playerName = this.view.playerName;
        this.infoView = infoView;

        this.view.mount(mountDOM);
        this.infoView.mount();

        this.view.bindInitialSetUpColors(this.onInitialSetUp);
        this.view.bindHitCase(this.onHitCase)
        this.view.bindCheckGameOver(this.checkGameOver)
        this.view.bindTriggerComputer(this.triggerComputer)

        const execute = (this.playerName === HUMAN_PLAYERNAME) ?
            this.gameManager.bindHumanCaseMarker(this.onCaseMarked) :
            this.gameManager.bindComputerCaseMarker(this.onCaseMarked)

        this.gameManager.bindMessageSetter(this.onSetMessage)
    }

    onCaseMarked = (i,j,action) => {
        return this.view.markCase(i,j,action)
    }
    onHitCase = (i,j) => {
        return this.gameManager.markCase(this.playerName,i,j);
    }

    triggerComputer = () => {
        this.gameManager.triggerComputer();
    }

    checkGameOver = () => {
        return this.gameManager.checkGameOver();
    }

    onSetMessage = (message) => {
        this.infoView.setMessage(message)
    }

    onInitialSetUp = () => {
        return this.gameManager.initialSetUp(this.playerName)
    }
}