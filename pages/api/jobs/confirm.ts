import { NextApiRequest, NextApiResponse } from "next";
import { CrawledJob, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
    const { selectedJobs } = req.body;

    try {
      const confirmedJobs = await prisma.crawledJob.findMany({
        where: {
          id: {
            in: selectedJobs,
          },
        },
      });

      const newJobsInArhciveTABLE = await prisma.archivedJob.createMany({
        data : confirmedJobs,
      })

      const newJobsInJOBTABLE = await prisma.job.createMany({
        data : confirmedJobs,
        })

      const deletedJobsInCRAWLEDJOBTABLE = await prisma.crawledJob.deleteMany({
        where: {
            id: {
                in: selectedJobs,
            },
        },
        });

      res.status(200).json({ message: 'Jobs Confirmend' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    } 
}
 
  