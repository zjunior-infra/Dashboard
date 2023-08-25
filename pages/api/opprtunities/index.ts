import { prisma } from "@/src/lib";
import { Curd } from "@/src/lib/crud";
import { CrawledOpportunity } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

type result = Promise<CrawledOpportunity | CrawledOpportunity[] | any >
class OpportunityController extends Curd{

  async Post(data:CrawledOpportunity | CrawledOpportunity[]): Promise<result> {

  }
  async Get(id?:string): Promise<result> {

  }
  async Update(id:string,data:CrawledOpportunity): Promise<result> {

  }
  async Delete(id:string): Promise<result> {
  }

}

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const controller = new OpportunityController()
    try{
      
    }
    catch(err){
      return res.status(500).json({message:"there's smth went wrong",Error:err})
  }
}