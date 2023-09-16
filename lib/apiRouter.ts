import { NextApiRequest, NextApiResponse } from "next";
import { getResultOrError } from "./utils";

/** 
 * Rotuer is used for GET, POST, PATCH, DELETE
 * @param req 
 * @param controller 
 * 
 * @returns Promise <T,ApiResponseError>
*/

export async function Router<T, _D>(req: NextApiRequest, controller:any): Promise<Result<T,ApiResponseError>> {
    try {
        switch (req.method) {
            case 'POST':
                return getResultOrError(await controller.Post(req.body as T))
            case 'GET':
                return getResultOrError(await controller.Get(req.body as T))
            case 'PATCH':
                return getResultOrError(await controller.Update(req.body as T))
            case 'DELETE':
                return getResultOrError(await controller.Delete(req.body as T));
            default:
                return {
                error:{
                    statusCode: 400,
                    message: 'This HTTP method is not allowed'
                    }
                }
        }
    }
    catch (err: any) {
        return {
            error:{
                statusCode: 500,
                message: "Our Server isn't feel good"
                }
            }
    }
}