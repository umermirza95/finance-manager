import { Utilities } from "../utilities/Utilities";

export class Transaction {

    id: string = null;
    categoryId:string=null;
    uid: string = null;
    type: string = Utilities.transactionTypes.expense;
    comment: string = null;
    amount: number = 0;
    timestamp:number=null;

    constructor(data: any = null) {
        if (data) {
            this.id = data.id ? data.id : null;
            this.uid = data.uid ? data.uid : null;
            this.type = data.type ? data.type : null;
            this.comment = data.comment ? data.comment : null;
            this.amount = data.amount ? data.amount : 0;
            this.categoryId=data.categoryId ?  data.categoryId : null;
            this.timestamp=data.timestamp ? data.timestamp : null;
        }
    }

    toJson(){
        return{
            amount:this.amount,
            categoryId:this.categoryId,
            comment:this.comment,
            timestamp:this.timestamp,
            type:this.type,
            uid:this.uid
        };
    }

}