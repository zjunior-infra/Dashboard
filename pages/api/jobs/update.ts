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
          const updatedJob = await prisma.crawledJob.update({
            where: { id: job.id },
            data: {
              company: 'New Company Name',
              title: 'New Job Title',
              email: 'new-email@example.com',
              deadline: 'New Deadline',
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