import mongoose from 'mongoose'

// Here we create out orderSchema


const orderSchema = new mongoose.Schema({
    _id          : { type : String, required : true},
    n_table      : {type : Number, required : true},
    waiter       : {type : String, required : true},
    to_prepare   : [{_id : String ,element : String ,amount : Number ,kind : String, time : Number }], 
    total_price  : {type : Number},
    ready_k      : {type : Boolean, default : false},
    ready_b      : {type : Boolean, default : false},
    date         : {type : Date, required : true }
});



// we turn this schema into a model (a collection)
export const OrderModel = mongoose.model('Order', orderSchema) ;

// find method it's used to find a particular data from Mongodb , in this case all the oders
export const getOrders = () => OrderModel.find() ;

export const getOrderByWaiter = (waiter : string) => OrderModel.findOne(({ "waiter" : {
    $regex : new RegExp(waiter, "i") }}));

export const getOrderByTable = (n_table : string) => OrderModel.find({'n_table' : n_table});

// Functions to create/delete/update an order
export const createOrder = (values : Record<string, any>) => 
       new OrderModel(values).save().then((order) => order.toObject());

export const deleteOrderById = (id :string) => OrderModel.findOneAndDelete({_id : id});

export const updateById = (id : string, values : Record<string, any>) => OrderModel.findByIdAndUpdate(id, values);
