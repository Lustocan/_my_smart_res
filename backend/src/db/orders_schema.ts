import mongoose from 'mongoose'

// Here we create out orderSchema


const orderSchema = new mongoose.Schema({
    _id : {type : String},
    n_table   : {type : Number, required : true},
    waiter      : {type : String, required : true},
    operator      : {type : String},
    total_time: {type : Number, required : true},
    to_prepare : [{element : String , amount : Number }], 
    total_price : {type : Number}
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