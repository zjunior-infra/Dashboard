import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/src/lib";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { selectedJobs } = req.body;

  try {
    // const newJobsInArhciveTABLE = await prisma.archivedJob.createMany({
    // data : confirmedJobs,
    // })

    const newJobsInJOBTABLE = await prisma.opportunity.createMany({
      data: selectedJobs,
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

