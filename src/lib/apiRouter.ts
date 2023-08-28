import { NextApiRequest } from "next";
import { controller } from "./crud";
//? need to finish it
export async function Router<T,D,E>(req:NextApiRequest, controller:controller) {
    switch (req.method){
        case 'POST':
            await controller.Post(req.body as D)
            break;
        case 'GET':
            const result = (await controller.Get(req.body as D)) as T;
            return result;
        case 'PATCH':
            await controller.Update(req.body as D)
            break;
        case 'DELETE':
            await controller.Delete(req.body as D)
            break;
    }
}