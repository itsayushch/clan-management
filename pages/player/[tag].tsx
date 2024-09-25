import { Center, Container, Grid, Paper, SimpleGrid, Skeleton, Text, Title, rem } from '@mantine/core';
import { getPlayer } from '../../lib/ClashHandler';
import { Player } from 'clashofclans.js';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { PlayerInfo } from '../../components/PlayerInfo';
import { StrikeCheckBox } from '../../components/StrikeCheckBox';
import { StrikeModal, Strikes } from '../../types';

export default function PlayerPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <Paper p={'xl'} m={{ base: 'xs', sm: 'xs', md: 'lg', lg: 'xl' }} shadow="xl" radius="md" style={{ overflowX: 'auto', background: 'var(--mantine-color-dark-9)' }}>
                <PlayerInfo player={data} />
            </Paper>
            <Paper mb={'xl'} mx={{ base: 'xs', sm: 'xs', md: 'lg', lg: 'xl' }} shadow="xl" radius="md" p="xs" style={{ overflowX: 'auto', background: 'var(--mantine-color-dark-9)' }}>
                {/* @ts-ignore */}
                {(data.strikes as StrikeModal).strike[0].createdAt}
            </Paper>
        </>
    );
}

export const getServerSideProps = (async (context) => {
    // Fetch data from external API
    const data = await getPlayer(`#${context.query.tag}`);
    // Pass data to the page via props
    return { props: { data: JSON.parse(JSON.stringify(data)) as Player } }
}) satisfies GetServerSideProps<{ data: Player }>
