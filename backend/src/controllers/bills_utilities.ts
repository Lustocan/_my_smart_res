import express from 'express' ;
import { deleteBillById ,updateBillById , getBillsByTable, getAllBills, createBill } from '../db/bills_schema';


export const getAllBillsbyTable = async(req : express.Request, res : express.Response ) => {
    try{
       const tables = await getAllBills();
       
       return res.status(200).json(tables);

    }
    catch(error){
        console.log(error);
        return res.sendStatus(400) ;
    }
}

export const  getBills = async (req : express.Request, res : express.Response) => {
    try{
        const orders = await getAllBills();

        return res.status(200).json(orders);
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
    
}


export const new_Bill = async(req : express.Request, res : express.Response ) => {
    try{
        const { operators,  served , payment,  date } = req.body ;

        const { n_table } = req.params         ;

        if(!n_table||!served||!payment||!operators||!date){
            return res.sendStatus(400) ;
        }

        const _id = require('uuid').v4() ;

        const order = await createBill({
             _id,
             n_table,
             operators,
             served,
             payment,
             date
        })

        return res.status(200).json(order) ;
    }
    catch(error){
        console.log(error) ;
        return res.sendStatus(400) ;
    }
}

export const updateBill = async (req : express.Request, res : express.Response) => {
    try{
        const { _id } = req.params    ;
       
        if(!_id){
           return res.sendStatus(400) ;
        }

        //if(ready_b) await updateBillById(_id, {ready_b : ready_b});

        return res.status(200).end()  ;
    }
    catch(error){
        console.log(error) ;
        res.sendStatus(400);
    }
}


export const deleteBill = async(req : express.Request, res : express.Response ) => {
    try{
        const {_id} = req.params;

        if(!_id){
            return res.sendStatus(400) ;
        }

        let delete_order = await deleteBillById(_id);

        return res.status(200).json(delete_order);
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);

    }
}