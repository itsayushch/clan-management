import { getLoginSession } from '#lib/auth'
import { findUser } from '#lib/admin'
import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteStrike, updateStrike } from '#lib/strike';
import { getStrikeValue } from '#assets/utils';
import { StrikePostData, UserModel } from '#types';
import rateLimitMiddleware from '#lib/ratelimit';


const handler = async function strike(req: NextApiRequest, res: NextApiResponse) {
    const session = await getLoginSession(req);
    const user = (session && (await findUser(session))) ?? null

    if (req.method === 'POST') {
        try {

            const { playerTag, uids }: { playerTag: string; uids: string[] } = req.body;

            const strikes: StrikePostData[] = [];
            for (const uid of uids) {
                strikes.push({
                    uid: Number(uid),
                    value: getStrikeValue(Number(uid)),
                    createdBy: {
                        playerTag: (user as UserModel).playerTag,
                        inGameName: (user as UserModel).inGameName,
                    },
                    createdAt: new Date()
                })
            }

            updateStrike({
                playerTag,
                strikeData: strikes
            })

            return res.status(200).json({ playerTag })
        } catch (error) {
            console.error(error)
            return res.status(500).end('Authentication token is invalid, please log in')
        }
    } else if (req.method === 'DELETE') {
        try {
            const { playerTag, uid }: { playerTag: string; uid: number } = req.body;
            deleteStrike({
                playerTag,
                uid
            })
            return res.status(200).json({ playerTag })
        } catch (error) {
            console.error(error)
            return res.status(500).end('Authentication token is invalid, please log in')
        }
    }
}

export default rateLimitMiddleware(handler);