import { prisma } from "@/lib";
import { Router } from "@/lib/apiRouter";
import { Curd } from "@/lib/crud";
import { NextApiRequest, NextApiResponse } from "next";


class crawledOpportunityController extends Curd<CrawledOpportunity[]> {
  async Post(data: CrawledOpportunity[]): Promise<any> {
    await prisma.crawledOpportunity.createMany({
      data: Array.isArray(data) ? data : [data], // Ensure data is an array
    });
  }

  async Get(): Promise<CrawledOpportunity[]> {
    const result = await prisma.crawledOpportunity.findMany();
    return result;
  }

  async Update(data: CrawledOpportunity[]): Promise<CrawledOpportunity[]> {
    try {
      const result = await Promise.all(
        data.map(async (opp: CrawledOpportunity) => {
          const updatedOpp = await prisma.crawledOpportunity.update({
            data: opp,
            where: { id: opp.id },
          });
          return updatedOpp;
        })
      );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async Delete(data: CrawledOpportunity[]): Promise<any> {
    const ids: string[] = data.map(opp => {
      return opp.id
    })
    await prisma.crawledOpportunity.deleteMany({
      where: { id: { in: ids } },
    });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const controller = new crawledOpportunityController();
  const { result, error } = await Router<CrawledOpportunity[], ApiResponseError>(
    req,
    controller
  );
  if (error) {
    return res.status(error.statusCode).json(error.message);
  }
  return res.status(200).json(result);
}