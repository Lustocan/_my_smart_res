import express from 'express' ;
import { getOrderByTable, createOrder, getOrders, deleteOrderById } from '../db/orders_schema';


export const getAllOrdersInThisTable = async(req : express.Request, res : express.Response ) => {
    try{
        const { n_table } = req.params ;

        //const orders = await getOrderByTable(n_table) ;

       // return res.status(200).json(orders) ;
       return res.status(200);

    }
    catch(error){
        console.log(error);
        return res.sendStatus(400) ;
    }
}

export const  getAllOrders = async (req : express.Request, res : express.Response) => {
    try{
        const orders = await getOrders();

        return res.status(200).json(orders);
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
    
}


export const new_Order = async(req : express.Request, res : express.Response ) => {
    try{
        const {_id ,waiter, total_time, to_prepare, total_price } = req.body ;

        const { n_table } = req.params         ;

        if(!n_table||!waiter||!to_prepare||!total_price||!total_time){
            return res.sendStatus(400) ;
        }

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


export const deleteOrder = async(req : express.Request, res : express.Response ) => {
    try{
        const {_id} = req.params;
        let delete_order = await deleteOrderById(_id);

        return res.status(200).json(delete_order);
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);

    }
}