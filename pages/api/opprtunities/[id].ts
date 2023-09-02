import { prisma } from "@/lib";
import { ApiResponseError, Router } from "@/lib/apiRouter";
import { Curd } from "@/lib/crud";
import { NextApiRequest, NextApiResponse } from "next";

class SingleOpportunityController extends Curd<CrawledOpportunity | void>{
    async Post(data: CrawledOpportunity):Promise<void> {}

    async Delete(data: CrawledOpportunity): Promise<CrawledOpportunity> {
        try{
            const deletedJob: CrawledOpportunity = await prisma.opportunity.delete({ where: { id: data.id } });
            return deletedJob;
        }
        catch(error){
            console.error(error);
            throw error;
        }
    }

    async Get(data: CrawledOpportunity): Promise<CrawledOpportunity> {
        try {
            const job: CrawledOpportunity = await prisma.opportunity.findFirstOrThrow({ where: { id: data.id } });
            return job;
        }
        catch(error){
            console.error(error);
            throw error;
        }
    }

    async Update(data: CrawledOpportunity): Promise<CrawledOpportunity> {
        try{
            const updatedJob: CrawledOpportunity = await prisma.opportunity.update({
                data: data,
                where: { id: data.id }
            });
            return updatedJob;
        }
        catch(error){
            console.error(error);
            throw error;
        }
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const controller = new SingleOpportunityController();
    req.body ||= { id: req.query.id };
    try{
        const result = await Router<CrawledOpportunity, ApiResponseError>(req, controller);
        if (result?.message)
            res.status(result.statusCode).json({ message: result.message });
        else
            res.status(result ? 200 : 204).json(result);
    }
    catch(error: unknown){
        console.error(error);
        res.status(500).json({ message: "there's smth went wrong", Error: error })
    }
}