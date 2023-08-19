import express from 'express' ;
import {  getQueues, createQueue, updateQueueById, deleteById } from '../db/queue_schema';


export const  getAllQueues = async (req : express.Request, res : express.Response) => {
    try{
        const orders = await getQueues();

        return res.status(200).json(orders);
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    } 
}


export const new_Queue = async(req : express.Request, res : express.Response ) => {
    try{
        const { queue, for_bar} = req.body ;

        if(!queue){
            return res.sendStatus(400) ;
        }

        const _id = require('uuid').v4() ;

        const order = await createQueue({
             _id,
             queue,
             for_bar,
        })

        return res.status(200).json(order) ;
    }
    catch(error){
        console.log(error) ;
        return res.sendStatus(400) ;
    }
}