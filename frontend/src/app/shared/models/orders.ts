export class Orders{
    constructor(date : Date, total_price: Number,
                to_prepare: Array<{_id : String, element: String, amount : Number, price : Number, kind : String, time ?: Number }>,
                staff : Array<{username : String, role : String }> ,  _id?: String , n_table?: Number, 
                ready_k ?:Boolean, ready_b ?:Boolean, bar_time ?: Number, kitchen_time ?: Number ){
            
            this._id= _id;
            this.n_table = n_table;
            this.staff = staff;
            this.to_prepare = to_prepare;
            this.ready_k = ready_k ;
            this.ready_b = ready_b ;
            this.bar_time = bar_time ;
            this.kitchen_time = kitchen_time ;
            this.date = date ;

        }

    _id ?: String;
    n_table ?: Number;
    staff : Array<{username : String ,role: String}> ;
    to_prepare : Array<{_id : String ,element: String, amount : Number, price : Number ,kind : String, time ?: Number}> ;
    ready_k ?: Boolean ;
    ready_b ?: Boolean ;
    bar_time ?: Number ;
    kitchen_time ?: Number ;
    date : Date ;
}
