import { Group, Paper, Badge, Table, Text, Center } from '@mantine/core';
import { getPlayer } from '../../lib/ClashHandler';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { PlayerInfo } from '../../components/PlayerInfo';
import { PlayerModal, StrikeModal } from '../../types';
import classes from '../../assets/index.module.css';
import { getReason, getStrikeColor } from '../../assets/utils';
import dayjs from 'dayjs';
import { IconTrash } from '@tabler/icons-react';
import { useUser } from '../../lib/hooks';

export default function PlayerPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const user = useUser();

    async function handleDelete(uid: number) {
        const res = await fetch('/api/update-strike', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerTag: data.tag,
                uid
            })
        });

        if (res.status === 200) {
            window.location.reload();
        } else {
            window.alert(await res.text());
        }
    }

    const rows = data.strikes?.strike.length ? data.strikes.strike.map((strike, index) => (
        <Table.Tr key={strike.uid} className={classes.control} style={{ cursor: 'auto' }}>

            <Table.Td>{index + 1}</Table.Td>
            <Table.Td maw={{ base: '50vw', lg: '15vw' }}>{getReason(strike.uid)}</Table.Td>

            <Table.Td>{strike.createdBy.inGameName} ({strike.createdBy.playerTag})</Table.Td>
            <Table.Td>{dayjs(strike.createdAt).format('DD MMM YYYY')}</Table.Td>
            <Table.Td>
                <Group gap="sm" pl={15}>
                    <Badge color={getStrikeColor(strike.value)} circle size="lg">{strike.value}</Badge>
                    <IconTrash
                        display={user ? 'block' : 'none'}
                        onClick={() => handleDelete(strike.uid)}
                        style={{ marginLeft: '2rem', cursor: 'pointer' }}
                        stroke={1.5}
                        color="var(--mantine-color-red-5)"
                    />
                </Group>
            </Table.Td>

        </Table.Tr>
    )) : null;

    return (
        <>
            <Paper p={'xl'} m={{ base: 'xs', sm: 'xs', md: 'lg', lg: 'xl' }} shadow="xl" radius="md" style={{ overflowX: 'auto', background: 'var(--mantine-color-dark-9)' }}>
                <PlayerInfo player={data} />
            </Paper>
            <Paper mih={{ base: '50vh', sm: '60vh', md: '40vh', lg: '30vh', xl: '30vh' }} mb={'xl'} mx={{ base: 'xs', sm: 'xs', md: 'lg', lg: 'xl' }} shadow="xl" radius="md" p="xs" style={{ overflowX: 'auto', background: 'var(--mantine-color-dark-9)' }}>

                {data?.strikes?.strike[0]?.value ? (<Table withRowBorders={false} horizontalSpacing={'lg'} verticalSpacing="sm" miw={{ base: '150vw', md: '120vw', lg: 'inherit', xl: 'inherit' }}>
                    <Table.Thead>
                        <Table.Tr style={{ textTransform: 'uppercase' }}>
                            <Table.Th>#</Table.Th>
                            <Table.Th>Reason for the Strike</Table.Th>
                            <Table.Th>Created By</Table.Th>
                            <Table.Th>Created At</Table.Th>
                            <Table.Th>Strikes</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>) : (
                    <Center>
                        <Text
                            size="xl"
                            fw={900}
                            variant="gradient"
                            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                            pt={{ base: '50%', sm: '20%', md: '10%', lg: '5%', xl: '5%' }}
                        >
                            You've got no strikes.
                        </Text>
                    </Center>
                )}

            </Paper>
        </>
    );
}

export const getServerSideProps = (async (context) => {
    // Fetch data from external API
    const data = await getPlayer(`#${context.query.tag}`);
    // Pass data to the page via props
    return { props: { data: JSON.parse(JSON.stringify(data)) as PlayerModal } }
}) satisfies GetServerSideProps<{ data: PlayerModal }>
