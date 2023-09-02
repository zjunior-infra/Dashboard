import { prisma } from "@/lib";
import { Router, ApiResponseError } from "@/lib/apiRouter";
import { Curd } from "@/lib/crud";
import { NextApiRequest, NextApiResponse } from "next";

class OpportunityController extends Curd<CrawledOpportunity | CrawledOpportunity[] | void> {
  async Post(data: CrawledOpportunity[] | CrawledOpportunity) {
    try {
      await prisma.opportunity.createMany({
        data: Array.isArray(data) ? data : [data], // Ensure data is an array
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async Get() {
    try {
      const result = await prisma.opportunity.findMany();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async Update(data: CrawledOpportunity[]) {
    try {
      const result = await Promise.all(
        data.map(async (opp: CrawledOpportunity) => {
          const updatedOpp = await prisma.opportunity.update({
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
  async Delete(data: CrawledOpportunity[]) {
    const ids: string[] = data.map(opp => {
      return opp.id
    })
    try {
      await prisma.opportunity.deleteMany({
        where: { id: { in: ids } },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const controller = new OpportunityController();
  try {
    const result = await Router<CrawledOpportunity | CrawledOpportunity[], ApiResponseError>(
      req,
      controller
    );
    if (result && "message" in result && "statusCode" in result)
      res.status(result.statusCode).json({message:result.message});
    else
      res.status(result ? 200 : 204).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", Error: err });
  }
}