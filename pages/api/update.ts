import { NextApiRequest, NextApiResponse } from "next";
import { CrawledJob, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const { selectedJobs } = req.body;
  
    try {
      const updatedJobs = await Promise.all(
        selectedJobs.map(async (job: CrawledJob) => {
           const { id, company,  title, link, email, type, deadline, logo, skills } = job; 
          const updatedJob = await prisma.crawledJob.update({
            where: { id: id },
            data: {
              company : company,
              title : title,
              link : link,
              email : email,
              type : type,
              deadline : deadline,
              logo : logo,
              skills : skills
            },
          });
          return updatedJob;
        })
      );
      console.log('Updated jobs:', updatedJobs);
      res.status(200).json({ message: 'Jobs updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }