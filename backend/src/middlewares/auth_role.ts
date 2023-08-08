import express from 'express';
import jwt from 'jsonwebtoken';
import dtn from 'dotenv';
import { getUserById } from '../db/users_schema';
import { authentication } from '../helpers/hash_pass';


export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionCookie = req.cookies['SessionCookie'];

        const { authorization } = req.headers;

        if (!sessionCookie) {
            return res.sendStatus(401);
        }
        dtn.config();

        const { _id } = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET) as jwtPayload;

        if (authentication(process.env.ACCESS_COOKIE_SECRET, _id) !== sessionCookie) {
            return res.sendStatus(403);
        }

        return next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}



interface jwtPayload {
    _id: string
}

export const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.sendStatus(401);
        }
        dtn.config();

        const { _id } = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET) as jwtPayload;

        const ex_user = await getUserById(_id);

        if (ex_user.role != 'casher') {
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

        if (!authorization) {
            return res.sendStatus(401);
        }
        dtn.config();

        const { _id } = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET) as jwtPayload;

        const ex_user = await getUserById(_id);

        if (ex_user.role != 'waiter') {
            return res.sendStatus(403);
        }

        return next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

export const sameUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { authorization } = req.headers;

        const { id } = req.params;

        dtn.config();

        const { _id } = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET) as jwtPayload;

        if (id !== _id) {
            return res.sendStatus(403);
        }
        return next();

    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}