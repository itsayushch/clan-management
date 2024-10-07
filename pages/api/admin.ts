import { getLoginSession } from '#lib/auth'
import { findUser } from '#lib/admin'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getLoginSession(req);
        const user = (session && (await findUser(session))) ?? null


        return res.status(200).json({ user })
    } catch (error) {
        console.error(error)
        return res.status(500).end('Authentication token is invalid, please log in')
    }
}