export class Bills{
    constructor(date : Date, _id ?: String, n_table ?: Number ,
                operators ?: Array<{username : String, role : String}>,
                served ?: Array<{_id : String ,element : String , price : Number ,amount : Number}>,
                payment ?: Number){
            
                this._id= _id;
                this.n_table = n_table;
                this.operators = operators;
                this.served = served;
                this.payment = payment;
                this.date = date ;
    }
    
    _id ?: String;
    n_table ?: Number;
    operators ?: Array<{username : String ,role: String}> ;
    served ?: Array<{_id : String ,element: String, price : Number, amount : Number}> ;
    total_price ?: Number;
    payment ?: Number ;
    date : Date ;
}
