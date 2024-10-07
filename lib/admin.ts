import { ObjectId } from 'mongodb';
import { UserModel } from '#types';
import { db } from '#lib/Database';

export async function createUser({ username, password, playerTag }: { username: string; password: string; playerTag: string }) {
    await db.collection('admins').insertOne({
        username,
        password,
        playerTag
    })

    return { username, playerTag }
}

export async function findUser({ username }: { username: string }) {
    const data = await db.collection<UserModel>('admins').findOne({ username });
    return data;
}

export function validatePassword(user: UserModel, inputPassword: string) {
    return user.password === inputPassword;
}

export async function findModerator({ _id }: { _id: ObjectId }) {
    const data = await db.collection<UserModel>('admins').findOne({ _id });
    return {
        name: data?.inGameName,
        playerTag: data?.playerTag
    }
}

