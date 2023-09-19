import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  let selectedJobs = req.body;
  if (!Array.isArray(selectedJobs))
    selectedJobs = [selectedJobs];

  try {
    await prisma.opportunity.createMany({ data: selectedJobs });

    const selectedJobsIDs = selectedJobs.map((el: CrawledOpportunity) => el.id);
    await prisma.crawledOpportunity.deleteMany({
      where: {
        id: { in: selectedJobsIDs }
      }
    });

    res.status(200).json({ message: 'Jobs Confirmend' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

