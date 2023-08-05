import express from 'express' ;
import { getUserByUsername, createUser, deleteUserById, getUsers, getUserById, updateUserById } from '../db/users_schema' ;
import { random, authentication } from '../helpers/hash_pass' ;
import jwt from 'jsonwebtoken' ; 
import dtn from 'dotenv'       ;

// this is the login controller

export const login = async (req : express.Request , res : express.Response ) => {
    try{
        const { username, password } = req.body ;
        
        if(!username || !password){
            return res.sendStatus(400) ;
        }
        
        var user = await getUserByUsername(username).select('+authentication.salt +authentication.password') ;

        const expectedHash = authentication(user.authentication.salt, password) ;

        if(user.authentication.password !== expectedHash){
            return res.sendStatus(403) ;
        }


        await user.save();

        var user = await getUserByUsername(username).select('-authentication.password -authentication.salt -authenticatio.sessionToken') ;

        dtn.config() ;
        const token = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn : "10h"});

        const sec = authentication(process.env.ACCESS_COOKIE_SECRET, user._id);

        res.cookie("SessionCookie", sec , {domain : 'localhost', path: '/', secure : true , httpOnly : true});

        return res.status(200).json(token).end();
    }
    catch(error){
        console.log(error) ;
        return res.sendStatus(400);
    }
}

export const logout = async (req : express.Request , res : express.Response ) => {
    try{
        const { id } = req.params ;
        
        if(!id){
            return res.sendStatus(400) ;
        }
        
        const user = await getUserById(id) ;

        dtn.config() ;
        
        res.cookie("SessionCookie", "invalid_cookie", {domain : 'localhost', path: '/', secure : true , httpOnly : true });

        return res.status(200).end();
    }
    catch(error){
        console.log(error) ;
        return res.sendStatus(400);
    }
}


export const sign_in = async ( req : express.Request, res : express.Response) => {
    try{
        // let's go to extract the data for our body
        const {name, surname , username, password, role} = req.body ; 

        //we check if any of these fields are missing
        if(!name || !password || !username || !role || !surname){
            return res.sendStatus(400);
        }

        /* Let's check if the email adress already exists
           Asynchronous functions are prefixed with the async keyword; await suspends the execution until an 
           asynchronous function return promise is fulfilled and unwraps the value from the Promise returned */
        const existingUser = await getUserByUsername(username);
        if(existingUser){
            return res.sendStatus(400);
        }

        const _id = require('uuid').v4() ;

        const salt =  random() ;
        
        const user = await createUser({
            _id,
            username,
            name,
            surname,
            role,
            authentication : {
                salt,
                password : authentication(salt, password),
            }
        });
        return res.status(200).json(user).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req : express.Request, res : express.Response) => {
    try{
        const { id } = req.params ;
        const { username, name, surname } = req.body ;
        if(!username&&!name&&!surname){
           return res.sendStatus(400) ;
        }

        if(username) await updateUserById(id, {username});

        if(name) await updateUserById(id, {name});

        if(surname) await updateUserById(id, {surname});
        
        const user = await getUserById(id);


        dtn.config() ;
        const token = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn : "10h"});

        return res.status(200).json(token).end()  ;
    }
    catch(error){
        console.log(error) ;
        res.sendStatus(400);
    }
}

export const deleteUser = async (req : express.Request, res : express.Response) => {
    try{
        const { id }  = req.params ;

        const deletedUser = await deleteUserById(id);

        return res.status(200).json(deletedUser).end();
    }
    catch(error){
        console.log(error)  ;
        res.sendStatus(400) ;
    }
}

export const getAllUsers = async(req : express.Request, res: express.Response) => {
    try{
       const users = await getUsers();
       return res.status(200).json(users);
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}