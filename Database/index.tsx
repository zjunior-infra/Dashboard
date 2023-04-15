import { PrismaClient } from "@prisma/client";


export const prisma = new PrismaClient();

//@ts-ignore
function formatJobs(jobs , {
    filterPriority= true,
    sortByDate=true
  }={})
  {   // add a close property to the job with true 
    //@ts-ignore
     const filteredJobs= jobs.reduce((acc,job)=>{
        const {deadline}=job;
        const date=new Date(deadline);
        const today=new Date();
        const closeDate=new Date(today.getFullYear(),today.getMonth(),today.getDate()+8);
        if(date<=closeDate){
          return [...acc, {...job, close:true}];
        } 
        acc.push(job)
        return acc;
     }, [])
     // filter by priority
     if(sortByDate){
      //@ts-ignore 
      filteredJobs.sort((a,b)=> new Date(a.deadline).getTime()-new Date(b.deadline).getTime());
     }
     return filteredJobs;
  }
  

  export async function getJobs() {
  const result=await prisma.crawledJob.findMany({
    take: 100,
  });
  return formatJobs(result);
}