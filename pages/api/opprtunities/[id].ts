import { prisma } from "@/src/lib";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const {id}:Partial<{ [key: string]: string | string[]; }> = req.query
    try{
        if(typeof id === 'string'){
            const job:CrawledOpportunity = await prisma.crawledOpportunity.findUniqueOrThrow({
                where:{
                    id: id
                }
            });
            return res.status(200).json(job)
        }
  }
  catch(err){
    return res.status(500).json({message:"there's smth went wrong",Error:err})
  }
}