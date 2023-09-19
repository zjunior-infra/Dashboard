import { prisma } from "@/lib";
import { Router } from "@/lib/apiRouter";
import { Curd } from "@/lib/crud";
import { methodNotAllowedError } from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

class SingleOpportunityController extends Curd<CrawledOpportunity | void>{
    async Post(): Promise<any> {
        return methodNotAllowedError()
    }

    async Delete(data: CrawledOpportunity): Promise<CrawledOpportunity> {
        const deletedJob: CrawledOpportunity = await prisma.crawledOpportunity.delete({ where: { id: data.id } });
        return deletedJob;
    }

    async Get(data: CrawledOpportunity): Promise<CrawledOpportunity> {
        const job: CrawledOpportunity = await prisma.crawledOpportunity.findFirstOrThrow({ where: { id: data.id } });
        return job;
    }

    async Update(data: CrawledOpportunity): Promise<CrawledOpportunity> {
        const updatedJob: CrawledOpportunity = await prisma.crawledOpportunity.update({
            data: data,
            where: { id: data.id }
        });
        return updatedJob;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const controller = new SingleOpportunityController();
    req.body ||= { id: req.query.id };
    const { result, error } = await Router<CrawledOpportunity, ApiResponseError>(req, controller);

    if (error) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(200).json(result);
}