import { prisma } from "@/lib";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = String(req.query.id);
    try {
        const job: CrawledOpportunity = await prisma.opportunity.findUniqueOrThrow({
            where: {
                id: id
            }
        });
        res.status(200).json(job)
    }
    catch (err: unknown) {
        if (err.code === 'P2025')
            return res.status(404).json({ message: "There is no job with the provided id" });
        else
            return res.status(500).json({ message: "there's smth went wrong", Error: err })
    }
}