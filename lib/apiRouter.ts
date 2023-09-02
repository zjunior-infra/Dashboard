import { NextApiRequest, NextApiResponse } from "next";
import { controller } from "./crud";

export interface ApiResponseError {
    message: string,
    statusCode: number
}

export async function Router<T, D>(req: NextApiRequest, controller: controller): Promise<T | ApiResponseError> {
    try {
        switch (req.method) {
            case 'POST':
                await controller.Post(req.body as T)
                break;
            case 'GET':
                const result = await controller.Get(req.query.id as string);
                return result as T;
            case 'PATCH':
                await controller.Update(req.body as T)
                break;
            case 'DELETE':
                await controller.Delete(req.body as T)
                break;
            default:
                return {
                    statusCode: 400,
                    message: 'This HTTP method is not allowed'
                }
        }
    }
    catch (err: unknown) {
        if (err.code === 'P2025')
            err.statusCode = 404;
        return {
            message: err.message || 'an error occured',
            statusCode: err.statusCode || 500
        }
    }
    return undefined as T;
}