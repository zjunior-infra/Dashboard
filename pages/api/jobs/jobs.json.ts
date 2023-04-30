import { getJobs } from "@/Database";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const Jobs = await getJobs();
        res.status(200).json(Jobs);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

