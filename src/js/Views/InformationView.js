import {$, $_} from "../_utils";

export class InformationView {
    constructor() {
        this.mounted = false;
        this.consoler = $_('div','information');
    }

    mount = () => {
        if (this.mounted) {
            return false
        } else {
            document.body.append(this.consoler)
            this.mounted = true;
            return true;
        }
    }

    setMessage = (message) => {
        this.consoler.textContent = message;
    }
}