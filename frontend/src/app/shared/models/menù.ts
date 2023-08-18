export enum Kind{
    drinks ='drinks', 
    dishes ='dishes', 
    coffe_bar = 'coffe_bar', 
    dessert = 'dessert'
}

export class Menù{

    constructor(kind : Kind, name?: String, price ?: Number, _id?: String, preparation_time ?: Number){
        this._id = _id === undefined ? "" : _id;;
        this.name = name === undefined ? "" : name;
        this.kind = kind;
        this.price = price === undefined ? 0 : price;
        this.preparation_time = preparation_time === undefined ? 0 : preparation_time;
    }
    _id ?: String;
    name : String;
    kind : Kind;
    price : Number;
    preparation_time : Number;
}