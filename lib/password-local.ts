import Local from 'passport-local'
import { findUser, validatePassword } from '#lib/admin'
import { UserModel } from '#/types'

export const localStrategy = new Local.Strategy((username: string, password: string, done) => {
    findUser({ username })
        .then((user) => {
            if (user && validatePassword(user as UserModel, password)) {
                done(null, user)
            } else {
                done(new Error('Invalid username and password combination'))
            }
        })
        .catch(() => {
            return
        })
})