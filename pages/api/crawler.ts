import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req : NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    
    res.status(200).json({ message: 'Job crawled successfully' });

}