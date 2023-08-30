import express from 'express' ;
import { createElement, getElementById, deleteElementById, updateElementById, getAllElementsByKind } from '../db/menu_schema'; 
import { redisClient } from '../base';


export const getAllByKind = async (req : express.Request, res : express.Response ) => {
    try{
        const {kind} = req.params;
        
        if(!kind){
            return res.sendStatus(400) ;
        }

        const redisKind = await redisClient.get(kind)

        if(redisKind){
            return res.status(200).json(JSON.parse(redisKind))
        }
        else{
            const allKindEl = await getAllElementsByKind(kind);

            redisClient.set(kind, JSON.stringify(allKindEl))
            
            return res.status(200).json(allKindEl);

        }
    }
    catch(error){
        console.log(error) ;
        return res.sendStatus(400);
    }
}

export const addNewElement = async (req : express.Request, res : express.Response ) => {
    try{
        const {_id ,name, price, preparation_time } = req.body ;

        const { kind } = req.params ;

        if(!_id||!name||!kind||!price||!preparation_time){
            return res.sendStatus(400) ;
        }
 
        const el = await createElement({
            _id,
            name,
            kind,
            price,
            preparation_time
        })

        redisClient.del(kind) ;

        return res.status(200).json(el);

    }
    catch(error){
        console.log(error);
        return res.sendStatus(400) ;
    }
}

export const deleteElement = async (req : express.Request, res : express.Response ) => {
    try{
        const { id } = req.params ;

        const deletedElement = await getElementById(id) ;

        await deleteElementById(id)

        redisClient.del(deletedElement.kind) ;

        return res.status(200).json(deletedElement)
    }
    catch(error){
        console.log(error) ;
        return res.sendStatus(400);
    }
}

export const updateElement = async (req : express.Request, res : express.Response ) => {
    try{
        const {id}  = req.params ;
        const {name, kind, price} = req.body ;

        if(!name&&!kind&&!price){
            return res.sendStatus(400) ;
        }
        if(name) await updateElementById(id, { name });

        if(kind) await updateElementById(id, { kind });

        if(price) await updateElementById(id, { price });

        const updatedElement = await getElementById(id);

        redisClient.del(kind) ;

        return res.status(200).json(updatedElement) ;
    }
    catch(error){
        console.log(error) ;
        return res.sendStatus(400) ;
    }
}