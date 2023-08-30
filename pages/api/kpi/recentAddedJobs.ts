import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/src/lib";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try{
        let {date, span} : any = req.query;
        if(date === undefined && span !== undefined)
            return res.status(400).json({message:"You can't send span without date!"});

        if (span === undefined)
            span = 7;

        if(date === undefined)
            date = new Date().setDate(new Date().getDate() - 7);
        else // Converting the date to the form of YYYY-MM-DD
            date = date.split('-').reverse().join('-');
        
        // Count interval [firstDate, secondDate]
        let firstDate = new Date(date), secondDate = new Date(firstDate);
        secondDate.setDate(secondDate.getDate() + Number(span));
        if(secondDate > new Date())
            secondDate = new Date();

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
        res.status(500).json({message:"there's smth went wrong"});
    }
}