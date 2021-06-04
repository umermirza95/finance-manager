import { Utilities } from "../utilities/Utilities";

export class Category {

    id: string = null;
    uid: string = null;
    type: string = Utilities.transactionTypes.expense;
    name: string = null;

    constructor(data: any = null) {
        if (data) {
            this.id = data.id ? data.id : null;
            this.uid = data.uid ? data.uid : null;
            this.type = data.type ? data.type : null;
            this.name = data.name ? data.name : null;
        }
    }

}