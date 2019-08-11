import { Request, Response, NextFunction } from 'express';
import {todoModel} from "../model/todoModel";

export class TodoController {
    static async getTodoList(req: Request, res: Response, next: NextFunction) {
        // const todoList = [{
        //     userId: 1,
        //     id: 1,
        //     title: "delectus aut autem",
        //     completed: false
        // },
        // {
        //     userId: 1,
        //     id: 2,
        //     title: "quis ut nam facilis et officia qui",
        //     completed: false
        // },
        // {
        //     userId: 1,
        //     id: 3,
        //     title: "fugiat veniam minus",
        //     completed: false
        // },
        // {
        //     userId: 1,
        //     id: 4,
        //     title: "et porro tempora",
        //     completed: true
        // },
        // {
        //     userId: 1,
        //     id: 5,
        //     title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
        //     completed: false
        // }];

        try{
            const todoList = await todoModel.find();
            res.json(todoList);
        }
        catch(err)
        {
            res.status(500).send(err);
        }

    }

    static async addTodo(req: Request, res: Response, next: NextFunction){
            try{
                const data = new todoModel(req.body);
                const todores = await todoModel.insertMany(data);
                res.json(todores);
            }
            catch (err){
                res.status(500).send(err);
            }
    }

    static async updateTask(req: Request, res: Response, next: NextFunction) {
        try{
            const data = new todoModel(req.body);
            const todores = await todoModel.findByIdAndUpdate(data._id, {
                $set: {
                    completed: req.body.completed,
                    title: req.body.title,
                },
            });
            res.json(todores);
        } catch (err)
        {
            res.status(500).send(err);
        }
    }
}