export enum Kind{
    drinks ='drinks', 
    dishes ='dishes', 
    coffe_bar = 'coffe_bar', 
    dessert = 'dessert'
}

export class Menù{

    constructor(kind : Kind, name?: String, price ?: String, _id?: String, prepare_time ?: String){
        this._id = _id === undefined ? "" : _id;;
        this.name = name === undefined ? "" : name;
        this.kind = kind;
        this.price = price === undefined ? "" : price;
        this.prepare_time = prepare_time === undefined ? "" : prepare_time;
    }
    _id ?: String;
    name : String;
    kind : Kind;
    price : String;
    prepare_time ?: String;
}