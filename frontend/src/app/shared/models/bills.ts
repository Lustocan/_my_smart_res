export class Bills{
    constructor(date : Date, _id?: String, n_table?: Number, staff ?: Array<{username : String, role : String }>, 
        to_prepare?: Array<{_id : String, element: String, amount : Number, kind : String, time : Number }>,
        total_price?: Number, ready_k ?:Boolean, ready_b ?:Boolean, bar_time ?: Number, kitchen_time ?: Number ){
            
            this._id= _id;
            this.n_table = n_table;
            this.staff = staff;
            this.to_prepare = to_prepare;
            this.total_price = total_price;
            this.bar_time = bar_time ;
            this.kitchen_time = kitchen_time ;
            this.date = date ;

        }

    _id ?: String;
    n_table ?: Number;
    staff ?: Array<{username : String ,role: String}> ;
    to_prepare ?: Array<{_id : String ,element: String, amount : Number, kind : String, time : Number}> ;
    total_price ?: Number;
    ready_k ?: Boolean ;
    ready_b ?: Boolean ;
    bar_time ?: Number ;
    kitchen_time ?: Number ;
    date : Date ;
}
