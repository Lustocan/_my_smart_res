import mongoose from 'mongoose'

// Here we create out orderSchema

const queueSchema = new mongoose.Schema({
    _id   : {type : String} , 
    queue : [{_id_order : String }],
    for_bar       : { type: Boolean , require : true}
});



// we turn this schema into a model (a collection)
export const QueueModel = mongoose.model('Queue', queueSchema) ;

// find method it's used to find a particular data from Mongodb , in this case all the oders
export const getQueues = () => QueueModel.find()                   ;


// Functions to create/delete/update an order
export const createQueue = (values : Record<string, any>) => 
       new QueueModel(values).save().then((queue) => queue.toObject());

export const deleteById = (id :string) => QueueModel.findOneAndDelete({_id : id});

export const updateQueueById = (id : string, values : Record<string, any>) => QueueModel.findByIdAndUpdate(id, values);

