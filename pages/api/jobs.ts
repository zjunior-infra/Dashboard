import { prisma } from "@/lib";
import { CrawledOpportunity, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const result = await prisma.crawledOpportunity.findMany();
        res.status(200).json(result);
    }
        catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error'},);
    }
}
