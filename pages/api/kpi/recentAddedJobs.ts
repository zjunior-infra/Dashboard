import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/src/lib";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try{
        if(req.method !== 'GET')
            return res.status(405).json({ message: 'Method not allowed' });

        let {date, span} : any = req.query;
        const dayToMilliseconds = 24 * 60 * 60 * 1000;

        span ||= 7;
        const firstDate = date ? new Date(date.split('-').reverse().join('-')) : new Date(Date.now() - span * dayToMilliseconds);
        const secondDate = new Date(firstDate.valueOf() + span * dayToMilliseconds);

        const numOfJobs = await prisma.opportunity.count({
            where:{
                createdAt:{
                    gte: firstDate,
                    lte: secondDate
                }
            }
        });

        res.json({number:numOfJobs});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"there's smth went wrong"});
    }
}