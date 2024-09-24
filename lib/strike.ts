import { UserModel } from '../types';
import  { db  } from './Database';

export async function updateStrike({ playerTag, strikes, reason }: { playerTag: string; strikes: number; reason: string }, admin: UserModel) {
    return db.collection('strikes').updateOne({ playerTag }, {
        $addToSet: {
            strike: {
                strikes,
                reason,
                createdBy: admin._id,
                createdAt: new Date()
            }
        }
    }, { upsert: true })
}