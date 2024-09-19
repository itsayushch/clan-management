import { Client } from "clashofclans.js";

const client = new Client({ baseURL: 'https://cocproxy.royaleapi.dev/v1', keys: ['eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImMzN2NkZTY0LTgwZmItNGQ0NS04OTVhLWNmNmYxY2VlYTVhMyIsImlhdCI6MTcyNjYwNTc4OSwic3ViIjoiZGV2ZWxvcGVyLzY4MjIzMWJmLTM4YmYtNmJjZi1lYTE0LTliMWIyNDNmNzBhMCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjQ1Ljc5LjIxOC43OSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.pN8oy60Dup_bDRyIOCGSm_uIvcfjxLMvTpkByCq9p0tTDQNEtl20XaxCNdJZC5CDOdjkid3jx1jHzz8fLg0ynQ'] });

export const getClanInfo = async (clanTag: string) => {
    const clan = await client.getClan(clanTag);

    return { clan, members: clan.members };
}

export const getPlayer = async (clanTag: string) => {
    const clan = await client.getPlayer(clanTag);
    return clan;
}
