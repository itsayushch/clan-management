import { StrikeModal, StrikePostData, UserModel } from '../types';
import { db } from './Database';

export async function updateStrike({ playerTag, strikeData }: { playerTag: string; strikeData: StrikePostData[] }) {
    return db.collection('strikes').updateOne({ playerTag }, {
        $addToSet: {
            strike: { $each: strikeData }
        }
    }, { upsert: true })
}

export async function deleteStrike({ playerTag, uid }: { playerTag: string; uid: number }) {
    return db.collection('strikes').updateOne({ playerTag },
        // @ts-ignore
        { $pull: { strike: { uid } } }
    )
}

export async function getStrike({ playerTag }: { playerTag: string }) {
    return db.collection<StrikeModal>('strikes').findOne({ playerTag }) ?? [];
}

export async function getAllStrikes() {
    return db.collection<StrikeModal>('strikes').find().toArray();
}

