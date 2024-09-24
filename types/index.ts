import { ObjectId } from 'mongodb';

export interface UserModel {
    _id: ObjectId;
    username: string;
    password: string;
    playerTag: string;
    createdAt: Date,
}

export interface StrikeModal {
    _id: ObjectId;
    playerTag: string;
    strike?: Strikes[];
}

export interface Strikes {
    createdAt: Date;
    strikes: number;
    createdBy: ObjectId;
    reason: string;
}