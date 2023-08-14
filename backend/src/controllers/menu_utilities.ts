import express from 'express' ;
import { getMenu, createElement, getElementById, deleteElementById, updateElementById, getAllElementsByKind } from '../db/menu_schema'; 

export const getAllElements = async (req : express.Request, res : express.Response ) => {
    try{
        const allEl = await getMenu();

        return res.status(200).json(allEl) ;
    }
    catch(error){
        console.log(error) ;
        return res.sendStatus(400);
    }
}

export const getAllByKind = async (req : express.Request, res : express.Response ) => {
    try{
        const {kind} = req.params;
        
        if(!kind){
            return res.sendStatus(400) ;
        }
        
        const allKindEl = await getAllElementsByKind(kind);
        return res.status(200).json(allKindEl);
    }
    catch(error){
        console.log(error) ;
        return res.sendStatus(400);
    }
}

export const addNewElement = async (req : express.Request, res : express.Response ) => {
    try{
        const { name, kind, price } = req.body ;

        if(!name||!kind||!price){
            return res.sendStatus(400) ;
        }

        const _id = require('uuid').v4() ;
 
        const el = await createElement({
            _id,
            name,
            kind,
            price
        })

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

        return res.status(200).json(updatedElement) ;
    }
    catch(error){
        console.log(error) ;
        return res.sendStatus(400) ;
    }
}