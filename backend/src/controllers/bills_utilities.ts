import express from 'express' ;
import { getAllBills, createBill } from '../db/bills_schema';
import { redisClient } from '../base';



export const  getBills = async (req : express.Request, res : express.Response) => {
    try{
        const redBills = await redisClient.get('bills') ;

        if(redBills){
            return res.status(200).json(JSON.parse(redBills))
        }
        else{
            const bills = await getAllBills();

            redisClient.set('bills', JSON.stringify(bills))

            return res.status(200).json(bills);
        }
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

        redisClient.del('bills') ;

        return res.status(200).json(order) ;
    }
    catch(error){
        console.log(error) ;
        return res.sendStatus(400) ;
    }
}
