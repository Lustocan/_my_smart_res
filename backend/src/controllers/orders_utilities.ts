import express from 'express' ;
import { updateById, createOrder, getOrders, deleteOrderById, getOrderByTable } from '../db/orders_schema';


export const getAllOrdersInThisTable = async(req : express.Request, res : express.Response ) => {
    try{
        const { n_table } = req.params ;

        const orders = await getOrderByTable(n_table) ;

        return res.status(200).json(orders) ;
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
        const {_id ,staff,  to_prepare, total_price, kitchen_time, bar_time, date } = req.body ;

        const { n_table } = req.params         ;

        if(!n_table||!staff||!to_prepare||!total_price||!date){
            return res.sendStatus(400) ;
        }

        const order = await createOrder({
             _id,
             n_table,
             staff,
             to_prepare,
             total_price,
             kitchen_time,
             bar_time,
             date
        })

        return res.status(200).json(order) ;
    }
    catch(error){
        console.log(error) ;
        return res.sendStatus(400) ;
    }
}

export const updateOrder = async (req : express.Request, res : express.Response) => {
    try{
        const { ready_k, ready_b  } = req.body ;
        const { _id } = req.params    ;
       
        if(!_id||(!ready_k&&!ready_b)){
           return res.sendStatus(400) ;
        }

        if(ready_k) await updateById(_id, {ready_k : ready_k});

        if(ready_b) await updateById(_id, {ready_b : ready_b});

        return res.status(200).end()  ;
    }
    catch(error){
        console.log(error) ;
        res.sendStatus(400);
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