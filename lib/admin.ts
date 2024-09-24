import { UserModel } from '../types';
import { db } from './Database';

export async function createUser({ username, password, playerTag }: { username: string; password: string; playerTag: string }) {
    await db.collection('admins').insertOne({
        username,
        password,
        playerTag
    })

    return { username, playerTag }
}

export async function findUser({ username }: { username: string }) {
    const data = await db.collection('admins').findOne({ username });
    return data;
}

export function validatePassword(user: UserModel, inputPassword: string) {

    return user.password === inputPassword;
}