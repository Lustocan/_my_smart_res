import express from 'express' ;
import { createTable, deleteTableById, getTableById, updateTableById, getTables,  getTableByNumber_ } from '../db/tables_schema';
import { redisClient } from '../base';

export const getAllTables = async (req : express.Request, res : express.Response ) => {
    try{
        const redTables = await redisClient.get('tables');

        if(redTables){
           return res.status(200).json(JSON.parse(redTables)) ;
        }
        else{
            const tables = await getTables();

            redisClient.set('tables', JSON.stringify(tables))
        
            return res.status(200).json(tables);
        }
    }
    catch(error){
        console.log(error) ;
        return res.sendStatus(400);
    }
}

export const getTableByNumber = async (req : express.Request, res : express.Response ) => {
    try{
        const { number } = req.params ;

        const table = await getTableByNumber_(parseInt(number)) ;

        return res.status(200).json(table) ;
    }
    catch(error) {
        console.log(error) ;
        return res.sendStatus(400) ;
    }
}

export const build_tab = async (req : express.Request , res : express.Response ) => {
    try{
        const { seats, number } = req.body ;

        if(!seats||!number){
           return res.sendStatus(400);
        }
        const _id = require('uuid').v4() ;
       
        const table = await createTable({
            _id,
            number,
            seats
        });

        redisClient.del('tables')

        return res.status(200).json(table);
    }
    catch(error){
       console.log(error)         ;
       return res.sendStatus(400) ;
    }
}

export const delete_tab = async (req : express.Request, res : express.Response) => {
    try{
        const {number} =  req.params ;
        

        var deletedTable = await getTableByNumber_(parseInt(number));


        deletedTable = await deleteTableById(deletedTable._id)

        redisClient.del('tables')

        return res.status(200).json(deletedTable);
    }
    catch(error){
        console.log(error) ;
        return res.sendStatus(400) ;
    }
}

export const update_tab = async (req : express.Request, res : express.Response) => {
    try{
        const { number } = req.params ;
        const { customers } = req.body ;

        let updatedTable = await getTableByNumber_(parseInt(number))

        updatedTable = await getTableById(updatedTable._id) ;


        if(customers<0||customers>updatedTable.seats){
            return res.sendStatus(400) ;
        }

        if(customers==0){
            await updateTableById(updatedTable._id, {
                 free : true ,
                 customers 
           })
        }
        else{
            await updateTableById(updatedTable._id, {
                free : false ,
                customers
          })
        }

        redisClient.del('tables')

        updatedTable = await getTableById(updatedTable._id) ;

        return res.status(200).json(updatedTable);
    }
    catch(error){
        console.log(error) ;
        return res.sendStatus(400);
    }
}
