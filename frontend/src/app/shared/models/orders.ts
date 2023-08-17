import { Menù } from "./menù";


export class Orders{
    constructor(_id?: String, n_table?: Number, waiter_username?: String, cook_username ?: String, 
        to_prepare?: [{element_name: String, amount : Number, prepare_time: Number}], total_price?: Number){
            this._id= _id;
            this.n_table = n_table;
            this.waiter_username = waiter_username;
            this.cook_username = cook_username;
            this.to_prepare = to_prepare;
            this.total_price = total_price;
        }

    _id ?: String;
    n_table ?: Number;
    waiter_username ?: String;
    cook_username ?: String;
    to_prepare ?: [{element_name: String, amount : Number, prepare_time: Number}] ;
    total_price ?: Number;
}
