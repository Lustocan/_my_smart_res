import { Menù } from "./menù";


export class Orders{
    constructor(_id?: String, n_table?: Number, waiter?: String, operator ?: String, 
        to_prepare?: [{element: String, amount : Number, prepare_time: Number}], total_price?: Number){
            this._id= _id;
            this.n_table = n_table;
            this.username = waiter;
            this.operator = operator;
            this.to_prepare = to_prepare;
            this.total_price = total_price;
        }

    _id ?: String;
    n_table ?: Number;
    username ?: String;
    operator ?: String;
    to_prepare ?: [{element: String, amount : Number, prepare_time: Number}] ;
    total_price ?: Number;
}
