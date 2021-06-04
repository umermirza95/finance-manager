import { Utilities } from "../utilities/Utilities";

export class Transaction {

    id: string = null;
    categoryId:string=null;
    uid: string = null;
    type: string = Utilities.transactionTypes.expense;
    comments: string = null;
    amount: number = 0;

    constructor(data: any = null) {
        if (data) {
            this.id = data.id ? data.id : null;
            this.uid = data.uid ? data.uid : null;
            this.type = data.type ? data.type : null;
            this.comments = data.comments ? data.comments : null;
            this.amount = data.amount ? data.amount : 0;
        }
    }

}