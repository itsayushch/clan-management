import type { NextApiRequest, NextApiResponse } from 'next'
import { getClanMembers } from '../../lib/ClashHandler'

 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const clan = await getClanMembers('#29R0QLL80');
    res.status(200).json(clan)
}