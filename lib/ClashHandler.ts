import { Client } from "clashofclans.js";
import { getAllStrikes, getStrike } from "./strike";

const client = new Client({ baseURL: 'https://cocproxy.royaleapi.dev/v1', keys: ['eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImMzN2NkZTY0LTgwZmItNGQ0NS04OTVhLWNmNmYxY2VlYTVhMyIsImlhdCI6MTcyNjYwNTc4OSwic3ViIjoiZGV2ZWxvcGVyLzY4MjIzMWJmLTM4YmYtNmJjZi1lYTE0LTliMWIyNDNmNzBhMCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjQ1Ljc5LjIxOC43OSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.pN8oy60Dup_bDRyIOCGSm_uIvcfjxLMvTpkByCq9p0tTDQNEtl20XaxCNdJZC5CDOdjkid3jx1jHzz8fLg0ynQ'] });

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

