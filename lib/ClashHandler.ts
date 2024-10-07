import { Client } from "clashofclans.js";
import { getAllStrikes, getStrike } from "#lib/strike";

const client = new Client({ baseURL: process.env?.BASE_URL ?? 'https://api.clashofclans.com/v1', keys: [process.env.API_TOKEN!] });

export const getClanInfo = async (clanTag: string) => {
    const clan = await client.getClan(clanTag);
    const strikes = await getAllStrikes();

    const calculateStrikes = (tag: string) => {
        const playerStrike = strikes.find(player => player.playerTag === tag);
        const sum = playerStrike?.strike!.reduce((accumulator: number, current) => accumulator + current.value, 0);
        return sum ?? 0;
    }

    return {
        clan,
        members: clan.members.map(member => {
            return {
                name: member.name,
                tag: member.tag,
                townHallLevel: member.townHallLevel,
                league: member.league,
                role: member.role.replace('elder', 'Elder').replace('coLeader', 'Co-Leader').replace('member', 'Member').replace('leader', 'Leader'),
                strikes: calculateStrikes(member.tag)
            }
        })
    };
}

export const getPlayer = async (playerTag: string) => {
    const player = await client.getPlayer(playerTag);
    const strikes = await getStrike({ playerTag });

    const calculateStrikes = () => {
        const sum = strikes?.strike!.reduce((accumulator: number, current) => accumulator + current.value, 0);
        return sum ?? 0;
    }

    const data = {
        ...player,
        totalStrikes: calculateStrikes(),
        strikes
    }

    return data;
}

