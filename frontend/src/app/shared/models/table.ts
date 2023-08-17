// definition of table object

import { ITable } from "../interfaces/ITable_add";


export class Table implements ITable {
    _id?: String;
    number!: Number;
    free?: boolean;
    seats!: Number;
    customers?: Number;
}