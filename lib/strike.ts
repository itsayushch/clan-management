import { StrikeModal, UserModel } from '../types';
import { db } from './Database';

export async function updateStrike({ playerTag, value, uid }: { playerTag: string; uid: number; value: number }, admin: UserModel) {
    return db.collection('strikes').updateOne({ playerTag }, {
        $addToSet: {
            strike: {
                uid,
                value,
                createdBy: admin._id,
                createdAt: new Date()
            }
        }
    }, { upsert: true })
}

export async function getStrike({ playerTag }: { playerTag: string }) {
    return db.collection<StrikeModal>('strikes').findOne({ playerTag })
}

export async function getAllStrikes() {
    return db.collection<StrikeModal>('strikes').find().toArray();

}
