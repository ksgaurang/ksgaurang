import {Request, Response, NextFunction} from  'express';
import { verify } from 'jsonwebtoken';

export function auth(req: Request, res: Response, next: NextFunction) {
    const privateKey = process.env.PRIVATEKEY || '';
    let token: any = req.headers['x-access-token'] || '';

    verify(token, privateKey, function (err: any, decoded: any) {
       if(err){
           res.status(401).send('Invalid User Authentication');
       }
       else {
           req.body._id = decoded._id;
           next();
       }
    })
}