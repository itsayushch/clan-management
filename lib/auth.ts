import { MAX_AGE, setTokenCookie, getTokenCookie } from '#lib/auth-cookies'

import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingMessage, ServerResponse } from 'http'

export async function setLoginSession(res: ServerResponse<IncomingMessage>, session: any) {
	const createdAt = Date.now()
	// Create a session object with a max age that we can validate later
	const obj = { ...session, createdAt, maxAge: MAX_AGE }



	setTokenCookie(res, JSON.stringify(obj))
}

export async function getLoginSession(req: NextApiRequest) {
	const token = getTokenCookie(req)
	if (!token) return

	const session = JSON.parse(token)

	const expiresAt = session.createdAt + (session.maxAge * 1000)

	// Validate the expiration date of the session
	if (Date.now() > expiresAt) {
		throw new Error('Session expired')
	}

	return session
}