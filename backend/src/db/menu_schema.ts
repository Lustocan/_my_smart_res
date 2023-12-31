import mongoose from 'mongoose'

// Here we create our userSchema
const MenuSchema = new mongoose.Schema({
    _id          : { type: String},
    name         : { type: String,  required:true, unique : true},
    kind         : { type: String,  required:true, enum : ['drinks', 'dishes', 'coffe_bar', 'dessert']},
    price        : { type: Number,  required:true  },
    preparation_time : {type: Number,  required:true  }
});

export const MenuModel = mongoose.model('Menu', MenuSchema) ;

export const getAllElementsByKind = (kind : string) => MenuModel.find({"kind" : {$regex : new RegExp(kind, "i")}});

export const getElementById = (id : string) => MenuModel.findById(id);

// Functions to create/delete/update an element
export const createElement = (values : Record<string, any>) => 
       new MenuModel(values).save().then((menu) => menu.toObject());
export const deleteElementById = (id :string) => MenuModel.findOneAndDelete({_id : id});
export const updateElementById = (id : string, values : Record<string, any>) => MenuModel.findByIdAndUpdate(id, values);