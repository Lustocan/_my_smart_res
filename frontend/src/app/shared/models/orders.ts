export class Orders{
    constructor(date : Date, _id?: String, n_table?: Number, waiter?: String, operator ?: String, 
        to_prepare?: Array<{_id : String, element: String, amount : Number, kind : String, time : Number }>,
        total_price?: Number, ready_k ?:Boolean, ready_b ?:Boolean, bar_time ?: Number, kitchen_time ?: Number ){
            
            this._id= _id;
            this.n_table = n_table;
            this.waiter = waiter;
            this.operator = operator;
            this.to_prepare = to_prepare;
            this.total_price = total_price;
            this.ready_k = ready_k ;
            this.ready_b = ready_b ;
            this.bar_time = bar_time ;
            this.kitchen_time = kitchen_time ;
            this.date = date ;

        }

    _id ?: String;
    n_table ?: Number;
    waiter ?: String;
    operator ?: String;
    to_prepare ?: Array<{_id : String ,element: String, amount : Number, kind : String, time : Number}> ;
    total_price ?: Number;
    ready_k ?: Boolean ;
    ready_b ?: Boolean ;
    bar_time ?: Number ;
    kitchen_time ?: Number ;
    date : Date ;
}
