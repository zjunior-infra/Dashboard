import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
    const { selectedJobs } = req.body;

    try {
      const confirmedJobs = await prisma.crawledOpportunity.findMany({
        where: {
          id: {
            in: selectedJobs,
          },
        },
      });

      // const newJobsInArhciveTABLE = await prisma.archivedJob.createMany({
        // data : confirmedJobs,
      // })

      const newJobsInJOBTABLE = await prisma.opportunity.createMany({
        data : confirmedJobs,
        })

      const deletedJobsInCRAWLEDJOBTABLE = await prisma.crawledOpportunity.deleteMany({
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
 
  