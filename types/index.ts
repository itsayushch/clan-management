import type { ClanMember, Player } from 'clashofclans.js';
import type { ObjectId } from 'mongodb';

export interface UserModel {
    _id: ObjectId;
    username: string;
    inGameName: string;
    password: string;
    playerTag: string;
    createdAt: Date,
}

export interface StrikeModal {
    _id: ObjectId;
    playerTag: string;
    strike: Strikes[] | [];
}

export interface Strikes {
    createdAt: Date;
    value: number;
    createdBy: {
        inGameName: string;
        playerTag: string;
    };
    uid: number;
}

export interface PlayerModal extends Player {
    totalStrikes: number;
    strikes: StrikeModal;
}

export interface ClanMemberModal extends ClanMember {
    strikes: number;
}

export interface StrikePostData {
    uid: number;
    value: number;
    createdBy: {
        playerTag: string;
        inGameName: string;
    },
    createdAt: Date
}
