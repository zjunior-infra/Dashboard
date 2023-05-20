import { NextApiRequest, NextApiResponse } from "next";
import { CrawledJob, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const { selectedJobs } = req.body;

  

    try {
      const deletedAuthor = await prisma.crawledJob.deleteMany({
        where: {
          id: {
            in: selectedJobs,
          },
        },
      });

      console.log({ deletedAuthor });
      res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    } 
}
 
  