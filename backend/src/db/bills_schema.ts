import mongoose from 'mongoose'

// Here we create our billsSchema
const BillsSchema = new mongoose.Schema({
    _id          : { type : String, required : true},
    n_table      : {type : Number, required : true},
    operators       : [{type : String, required : true}],
    served   : [{_id : String ,element : String ,amount : Number ,kind : String}], 
    payment : {type : Number, reuqired : true},
    date    : {type : Date, required : true}
});

export const BillsModel = mongoose.model('Bills', BillsSchema) ;

export const getAllBills = () => BillsModel.find() ;

export const getBillsByTable = (n_table : Number) => BillsModel.find({"n_table" : n_table});

export const getBillById = (id : string) => BillsModel.findById(id);



// Functions to create/delete/update an element
export const createBill = (values : Record<string, any>) => 
       new BillsModel(values).save().then((bill) => bill.toObject());
export const deleteBillById = (id :string) => BillsModel.findOneAndDelete({_id : id});
export const updateBillById = (id : string, values : Record<string, any>) => BillsModel.findByIdAndUpdate(id, values);