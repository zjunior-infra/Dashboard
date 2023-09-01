import { NextApiRequest } from "next";
import { controller } from "./crud";
//? need to finish it
export async function Router<T,D,E>(req:NextApiRequest, controller:controller) {
    switch (req.method){
        case 'POST':
            controller.Post()
            break;
        case 'GET':
            controller.Get()
            break;
        case 'PATCH':
            controller.Update()
            break;
        case 'DELETE':
            controller.Delete()
            break;
    }
}