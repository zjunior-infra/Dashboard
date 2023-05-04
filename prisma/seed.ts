import { CrawledJob, Prisma, PrismaClient } from "@prisma/client"

const CrawledJobs:CrawledJob[] = [
    {
        id:"20022",
        company:"Apple",
        title:"Software engineer",
        link:"https://zjunior.com",
        email:"",
        type:"Internship",
        deadline:"2023-06-02",
        logo:"https:/zjunior.com/images/logo.png",
        skills:"React, NodeJs, Docker"
    },
    {
        id:"23132",
        company:"Google",
        title:"Software Engineer",
        link:"https://zjunior.com",
        email:"",
        type:"Internship",
        deadline:"2023-06-02",
        logo:"https:/zjunior.com/images/logo.png",
        skills:"React, NodeJs, Docker"
    },
    {
        id:"21312412",
        company:"zJunior",
        title:"Software engineer",
        link:"https://zjunior.com",
        email:"",
        type:"EntryLevel",
        deadline:"2023-06-02",
        logo:"https:/zjunior.com/images/logo.png",
        skills:"React, NodeJs, Docker"
    },

]

const prisma = new PrismaClient();

async function main(){
    const seed = await prisma.crawledJob.createMany({
        data: CrawledJobs
    })
    console.log(seed)
}

main()
.then(async ()=>{
    await prisma.$disconnect();
})
.catch(async (err)=>{
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
})