import './styles/index.scss'
import {start} from "./js/Game";
import {$_} from "./js/_utils";

const app = document.querySelector('#root')
app.append($_('div','board-human'),$_('div','board-computer'))
start()
