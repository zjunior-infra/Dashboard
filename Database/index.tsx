import { CrawledOpportunity, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
  

export async function getJobs(){
  try{
    const result:CrawledOpportunity[] = await prisma.crawledOpportunity.findMany({});
    return result;  
  }
  catch(err){
    console.log(err);
  }
}