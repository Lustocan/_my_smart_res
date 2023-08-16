// definition of table object

import { ITable } from "../interfaces/ITable_add";


export class Table implements ITable {
    constructor(number: Number, seats: Number, customers?: Number, id?: String, free?: boolean){
        this._id = id === undefined ? undefined : id;
        this.number = number;
        this.free = free === undefined ? true : free;
        this.seats = seats ;
        this.customers = customers === undefined ? 0 : customers ;
    }
    _id?: String;
    number!: Number;
    free?: boolean;
    seats!: Number;
    customers?: Number;
}