import express from 'express' ;
import { getOrderByTable, createOrder } from '../db/orders_schema';

export const getAllOrdersInThisTable = async(req : express.Request, res : express.Response ) => {
    try{
        const { n_table } = req.params ;

        const orders = await getOrderByTable(n_table) ;

        return res.status(200).json(orders) ;

    }
    catch(error){
        console.log(error);
        return res.sendStatus(400) ;
    }
}


export const new_Order = async(req : express.Request, res : express.Response ) => {
    try{
        const { waiter, total_time, to_prepare, total_price } = req.body ;

        const { n_table } = req.params         ;

        if(!n_table||!waiter||!to_prepare||!total_price||!total_time){

            return res.sendStatus(400) ;
        }

        const _id = require('uuid').v4() ;

        const order = await createOrder({
             _id,
             n_table,
             waiter,
             to_prepare,
             total_price,
             total_time
        })

        return res.status(200).json(order) ;
    }
    catch(error){
        console.log(error) ;
        return res.sendStatus(400) ;
    }
}