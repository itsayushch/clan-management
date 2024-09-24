import passport from 'passport'
import { createRouter } from "next-connect";
import { localStrategy } from '../../lib/password-local'
import { setLoginSession } from '../../lib/auth'
import { UserModel } from '../../types';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import rateLimitMiddleware from "../../lib/ratelimit";

async function authenticate(method: string | string[], req: NextApiRequest, res: NextApiResponse): Promise<UserModel> {
    return new Promise((resolve, reject) => {
        passport.authenticate(method, { session: false }, (error: any, token: any) => {
            if (error) {
                reject(error)
            } else {
                resolve(token)
            }
        })(req, res)
    })
}


passport.use(localStrategy)

const router = createRouter<NextApiRequest, NextApiResponse>();

// @ts-expect-error
router.use(passport.initialize())

router.post(async (req, res) => {
    try {
        const user = await authenticate('local', req, res)
        // session is the payload to save in the token, it may contain basic info about the user
        const session = { ...user }
        await setLoginSession(res, session)

        res.status(200).send({ done: true })
    } catch (error: any) {
        console.error(error)
        res.status(401).send(error.message)
    }
});

const handler = router.handler({
    onError(err, req, res) {
        res.status(500).json({
            error: (err as Error).message,
        });
    },
});
export default rateLimitMiddleware(handler);