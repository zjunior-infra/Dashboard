import { CrawledJob, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
  

export async function getJobs(){
  try{
    const result:CrawledJob[] = await prisma.crawledJob.findMany({});
    return result;  
  }
  catch(err){
    console.log(err);
  }
}