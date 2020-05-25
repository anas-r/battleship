import {GamePvC} from "./Models/GamePvC";
import {GameSide} from "./Models/GameSide";
import {Board} from "./Models/Board";
import {
    $,
    _generateShipsArray,
    BOARD_SIZE,
    COMPUTER_PLAYERNAME,
    HUMAN_PLAYERNAME
} from "./_utils";

import {BoardController} from "./Controllers/BoardController";
import {BoardView} from "./Views/BoardView";
import {GameManager} from "./Models/GameManager";
import {InformationView} from "./Views/InformationView";

export function start() {
    const game = new GamePvC(
        new GameSide(HUMAN_PLAYERNAME, new Board(_generateShipsArray())),
        new GameSide(COMPUTER_PLAYERNAME, new Board(_generateShipsArray())))

    const infoView = new InformationView()

    const manager = new GameManager(game);

    const controllerHuman = new BoardController(new BoardView(BOARD_SIZE, () => HUMAN_PLAYERNAME), manager, $('.board-human'), infoView);
    const controllerComputer = new BoardController(new BoardView(BOARD_SIZE, () => COMPUTER_PLAYERNAME), manager, $('.board-computer'), infoView);

}