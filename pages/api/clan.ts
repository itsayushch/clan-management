import type { NextApiRequest, NextApiResponse } from 'next'
import { getClanInfo } from '../../lib/ClashHandler'

 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const clan = await getClanInfo('#29R0QLL80');
    res.status(200).json(clan)
}