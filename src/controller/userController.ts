import {Request, Response, NextFunction} from  'express';
import { userModel } from "../model/userModel";
import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';

export class UserController{
    static getUsers(req:Request, res:Response, next: NextFunction) {
        res.json({id: 1, name: 'KSGaurang'});
    }

    static addUser(req: Request, res: Response, next: NextFunction){
        console.log('User Added');
        res.json({status: 'User added successfully'});
    }

    static async login(req: Request, res: Response, next: NextFunction){
        try{
            const privateKey = process.env.PRIVATEKEY || '';
            let token='';
            const loginRes : any = await userModel.findOne({
                email: req.body.email
            });

            if(loginRes){
                const isValidPwd = compareSync(req.body.password, loginRes.password);

                if (isValidPwd) {
                    token = sign({_id: loginRes.id},
                        privateKey,
                        { expiresIn: '1h'});
                        const tokenRes = { data: loginRes, token: token};
                        res.json(tokenRes);
                } else{
                    res.status(401).json('Incorrect Username or password');
                }

            } else {
                res.status(401).json('Incorrect Username or password');
            }

        }
        catch(err){
            res.status(500).send(err);
        }
    }

    static async registration(req: Request, res: Response, next: NextFunction){
       try{
           const userData =  new userModel(req.body);
           const loginRes = await userModel.create(userData);
            res.json(loginRes);
       }
       catch(err){
           res.status(500).send(err);
       }

    }


}