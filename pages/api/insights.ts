import { prisma } from "@/lib";
import analyticsDataClient from "@/lib/GA4";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    try {
        return res.json({ ...(await getDB()), ...(await getReport()) });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getReport() {
    const [response] = await analyticsDataClient.runReport({
        property: `properties/${process.env.PROPERTY_ID}`,
        dateRanges: [
            {
                startDate: '28daysAgo',
                endDate: 'today',
            },
        ],
        dimensions: [{ name: 'eventName' }],
        metrics: [
            {
                name: 'totalUsers', // totalUsers || activeUsers
            },
            {
                name: 'eventCount',
            }
        ],
    });
    console.log(response);
    let users = 0, totalVisits = 0, clickApply = 0;
    if (response?.rows) {
        response.rows.forEach(row => {
            if (row.metricValues?.length) {
                totalVisits += Number(row.metricValues[1].value);
                if (row.dimensionValues?.length && row.dimensionValues[0].value === 'page_view')
                    users += Number(row.metricValues[0].value);
                if (row.dimensionValues?.length && row.dimensionValues[0].value === 'click_apply')
                    clickApply = Number(row.metricValues[0].value);
            }
        });
    }
    return { users, totalVisits, clickApply }
    //return response;
}

async function getDB() {
    const crawledOpp = await prisma.crawledOpportunity.count();
    const liveJob = await prisma.opportunity.count();
    return { crawledOpp, liveJob };
}