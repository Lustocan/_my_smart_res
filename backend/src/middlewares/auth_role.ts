import express from 'express';
import jwt from 'jsonwebtoken';
import dtn from 'dotenv';
import { authentication } from '../helpers/hash_pass';


export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionCookie = req.cookies['SessionCookie'];

        const { authorization } = req.headers;

        if (!sessionCookie||!authorization) {
            return res.sendStatus(401);
        }
        dtn.config();

        const { _id } = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET) as jwtPayload;

        if (authentication(process.env.ACCESS_COOKIE_SECRET, _id) !== sessionCookie) {
            return res.sendStatus(401);
        }

        return next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}



interface jwtPayload {
    _id: string,
    role: string
}

export const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { authorization } = req.headers;

        dtn.config();

        const { role } = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET) as jwtPayload;

        if (!role||role != 'casher') {
            return res.sendStatus(403);
        }

        return next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

export const isWaiter = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { authorization } = req.headers;

        dtn.config();

        const { role } = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET) as jwtPayload;


        if(!role){
            return res.sendStatus(401);
        }
        if (!role||role != 'waiter') {
            return res.sendStatus(403);
        }

        return next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

export const isWaiterOrAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { authorization } = req.headers;

        dtn.config();

        const { role } = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET) as jwtPayload;

        if(!role){
           return res.sendStatus(401);
        }
        if(role != 'waiter'&&role != 'casher') {
            console.log('ciao')
            return res.sendStatus(403);
        }

        return next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

export const isCookOrAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { authorization } = req.headers;

        dtn.config();

        const { role } = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET) as jwtPayload;

        if(!role){
            return res.sendStatus(401);
        }
        if(role != 'cook'&&role != 'casher') {
            return res.sendStatus(403);
        }

        return next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

export const isBartenderOrAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { authorization } = req.headers;

        dtn.config();

        const { role } = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET) as jwtPayload;



        if(!role){
            return res.sendStatus(401);
        }
        if(role != 'bartender'&&role != 'casher') {
            return res.sendStatus(403);
        }

        return next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

