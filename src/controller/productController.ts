import { Request, Response, NextFunction } from 'express';

export class ProductController {
    static async getProducts(req: Request, res: Response, next: NextFunction) {
        res.json([{ id: 1, name: 'ParleG' },
        { id: 2, name: 'Vita Marie' }]);
    }

    async add() {
        return 4;
    }
}