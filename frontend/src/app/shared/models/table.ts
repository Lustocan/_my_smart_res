// definition of table object


export class Table {
    constructor(number: String, seats: Number, costumers: Number, id?: String, free?: boolean){
        this._id = id === undefined ? undefined : id;
        this.number = number;
        this.free = free === undefined ? true : false;
        this.seats = seats ;
        this.costumers = costumers ;

    }
    _id?: String;
    number?: String;
    free?: boolean;
    seats?: Number;
    costumers?: Number;
}