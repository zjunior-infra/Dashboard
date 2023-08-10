import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib";




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const { selectedJobs } = req.body;
  
    try {
      const updatedJobs = await Promise.all(
        selectedJobs.map(async (job: CrawledOpportunity) => {
           const { id, company,  title, link,description,role , level, logo, skills } = job; 
          const updatedJob = await prisma.crawledOpportunity.update({
            where: { id: id },
            data: {
              company : company,
              title : title,
              link : link,
              description: description,
              level : level,
              role:role,
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