import { prisma } from "@/src/lib";
import { Curd } from "@/src/lib/crud";
import { NextApiRequest, NextApiResponse } from "next";

type result = Promise<CrawledOpportunity | CrawledOpportunity[] | any >
class OpportunityController extends Curd{

  async Post(data:CrawledOpportunity[]): Promise<result> {
    try{
      await prisma.opportunity.createMany({
        data:data
      });
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }
  async Get(): Promise<result> {
    try{
      const result = await prisma.opportunity.findMany();
      return result;
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }
  async Update(data: CrawledOpportunity[]): Promise<result> {
    try{
      const result = await Promise.all(data.map(async(opp: CrawledOpportunity) => {
        const updatedOpp = await prisma.opportunity.update({
          data: opp,
          where: { id: opp.id }
        });
        return updatedOpp;
      }));    
      return result;    
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }
  async Delete(ids:string[]): Promise<result> {
    try{
      await prisma.opportunity.deleteMany({ 
        where:
         { id: { in:ids } }
        });
    }
    catch(error){
      console.log(error);
      throw error;
    }
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