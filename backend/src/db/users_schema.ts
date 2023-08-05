import mongoose from 'mongoose'

// Here we create our userSchema
const UserSchema = new mongoose.Schema({
    _id : { type: String},
    username : { type: String, required:true, unique : true},
    name : { type: String,  required:true},
    surname : { type: String,  required:true},
    role    : { type: String,  required:true, enum : ['waiter', 'cook', 'casher', 'bartender']},
    authentication: {
         password     : { type : String, required: true, select: false},
         salt         : { type : String, select : false},
    },
});

// we turn this schema into a model (a collection), modelName = User using the UserSchema
export const UserModel = mongoose.model('User', UserSchema);

// find method it's used to find a particular data from Mongodb , in this case all the users
export const getUsers = () => UserModel.find();

// we are gonna use this in various authentications such a registrating let's see if the exact user exists and stuff like that
export const getUserByUsername = (username : string) => UserModel.findOne({ "username" : {
    $regex : new RegExp(username, "i") }}); // using of regex to do case insensitive querys

// we are gonna use this to get a user by id
export const getUserById = (id : string) => UserModel.findById(id);

// Functions to create/delete/update a user
export const createUser = (values : Record<string, any>) => 
       new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id :string) => UserModel.findOneAndDelete({_id : id});

export const updateUserById = (id : string, values : Record<string, any>) => UserModel.findByIdAndUpdate(id, values);