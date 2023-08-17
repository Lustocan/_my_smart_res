export enum Kind{
    drinks ='drinks', 
    dishes ='dishes', 
    coffe_bar = 'coffe_bar', 
    dessert = 'dessert'
}

export class Menù{

    constructor(kind : Kind, name?: String, price ?: Number, _id?: String, prepare_time ?: Number){
        this._id = _id === undefined ? "" : _id;;
        this.name = name === undefined ? "" : name;
        this.kind = kind;
        this.price = price === undefined ? 0 : price;
        this.prepare_time = prepare_time === undefined ? 0 : prepare_time;
    }
    _id ?: String;
    name : String;
    kind : Kind;
    price : Number;
    prepare_time : Number;
}