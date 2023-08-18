export class Orders{
    constructor(_id?: String, n_table?: Number, waiter?: String, operator ?: String, 
        to_prepare?: [{element: String, amount : Number}], total_price?: Number, total_time? : Number){
            this._id= _id;
            this.n_table = n_table;
            this.username = waiter;
            this.operator = operator;
            this.to_prepare = to_prepare;
            this.total_price = total_price;
            this.total_time = total_time ;
        }

    _id ?: String;
    n_table ?: Number;
    username ?: String;
    operator ?: String;
    to_prepare ?: [{element: String, amount : Number}] ;
    total_price ?: Number;
    total_time ?: Number ;
}
