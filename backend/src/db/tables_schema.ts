import mongoose from 'mongoose'


const TableSchema = new mongoose.Schema({
    _id       :  {type: String},
    number    : { type: Number , required : true , unique : true },
    free      : { type: Boolean , default : true },
    seats     : { type: Number, required : true },
    customers : { type: Number, default : 0 },
}) 


export const TableModel = mongoose.model('Table', TableSchema) ;

export const getTables = () => TableModel.find().sort({number : 'asc'})               ;

export const getTableById = (id : string) => TableModel.findById(id);

export const getTableByNumber_ = (number : string) => TableModel.findOne({"number" : number});


export const createTable = (values : Record<string, any>) => 
       new TableModel(values).save().then((table) => table.toObject());

export const deleteTableById = (id : string) => TableModel.findByIdAndDelete({_id : id});
export const updateTableById = (id : string, values : Record<string, any>) => TableModel.findByIdAndUpdate(id, values);