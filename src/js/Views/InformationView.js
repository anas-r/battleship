import {$, $_} from "../_utils";

export class InformationView {
    constructor() {
        this.mounted = false;
        this.container = $_('div','information-container');
        this.message = $_('div','information-message');
        this.message.textContent = "welcome to battleship. enjoy"
        this.container.append(this.message);
    }

    mount = () => {
        if (this.mounted) {
            return false
        } else {
            $('#root').append(this.container)
            this.mounted = true;
            return true;
        }
    }

    setMessage = (message) => {
        this.message.textContent = message;
    }
}