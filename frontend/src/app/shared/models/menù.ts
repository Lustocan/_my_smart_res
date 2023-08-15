export enum Kind{
    drinks ='drinks', 
    dishes ='dishes', 
    coffe_bar = 'coffe_bar', 
    dessert = 'dessert'
}

export class Menù{

    constructor(kind : Kind, name?: String, price ?: String, _id?: String){
        this._id = _id === undefined ? "" : _id;;
        this.name = name === undefined ? "" : name;
        this.kind = kind;
        this.price = price === undefined ? "" : price;;
    }
    _id ?: String;
    name : String;
    kind : Kind;
    price : String;
}