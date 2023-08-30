import express from 'express' ;
import { updateById, createOrder, getOrders, deleteOrderById, getOrderByTable, deleteOrdersByTable } from '../db/orders_schema';
import { redisClient } from '../base';

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

export const  getAllOrders = async (req : express.Request, res : express.Response) => {
    try{
        const redOrders = await redisClient.get('orders') ;
        if(redOrders){
            return res.status(200).json(JSON.parse(redOrders)) ;
        }
        else{
            const orders = await getOrders();

            redisClient.set('orders', JSON.stringify(orders))

            return res.status(200).json(orders);
        }
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
    
}


export const new_Order = async(req : express.Request, res : express.Response ) => {
    try{
        let {_id ,staff,  to_prepare, kitchen_time, bar_time, date } = req.body ;

        const { n_table } = req.params         ;

        

        if(!n_table||!staff||!to_prepare||!date){
            return res.sendStatus(400) ;
        }

        bar_time  = bar_time * 60 ;
        kitchen_time = kitchen_time * 60 ;

        const order = await createOrder({
             _id,
             n_table,
             staff,
             to_prepare,
             bar_time,
             kitchen_time,
             date
        })

        redisClient.del('orders') 

        return res.status(200).json(order) ;
    }
    catch(error){
        console.log(error) ;
        return res.sendStatus(400) ;
    }
}

export const updateOrder = async (req : express.Request, res : express.Response) => {
    try{
        const { staff ,ready_k, ready_b, kitchen_time, bar_time, to_prepare  } = req.body ;
        const { _id } = req.params    ;
       
        if(!_id){
           return res.sendStatus(400) ;
        }

        if(ready_k) await updateById(_id, {ready_k : ready_k});

        if(ready_b) await updateById(_id, {ready_b : ready_b});

        if(kitchen_time) await updateById(_id, {kitchen_time : kitchen_time});

        if(bar_time) await updateById(_id, {bar_time : bar_time});

        if(staff) await updateById(_id, {staff : staff});

        if(to_prepare) await updateById(_id, {to_prepare : to_prepare});

        redisClient.del('orders') 

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

        if(!_id){
            return res.sendStatus(400) ;
        }

        let delete_order = await deleteOrderById(_id);

        redisClient.del('orders') 

        return res.status(200).json(delete_order);
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);

    }
}


export const deleteAllOrdersInThisTable = async(req : express.Request, res : express.Response) => {
    try{
        const { n_table } = req.params ;
        if(!n_table){
            return res.sendStatus(400) ;
        }

        const orders = await deleteOrdersByTable(n_table) ;

        redisClient.del('orders') 

        return res.status(200).json(orders) ;
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400) ;
    }
}