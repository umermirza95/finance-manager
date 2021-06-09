export class Utilities {

    static transactionTypes = {
        income: "income",
        expense: "expense"
    }

    static dateParser(timestamp: number) {
        let date= new Date(timestamp);
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    }
}