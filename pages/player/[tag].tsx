import { Center, Container, Grid, SimpleGrid, Skeleton, Text, Title, rem } from '@mantine/core';
import { getPlayer } from '../../lib/ClashHandler';
import { Player } from 'clashofclans.js';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export default function PlayerPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Container my="md">
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <Center maw={400} h={100} bg="var(--mantine-color-gray-light)">
                    <Text>{data.name}</Text>
                    <Text>{data.tag}</Text>

                </Center>
                <Grid gutter="md">
                    <Grid.Col>
                        <Center maw={400} h={100} bg="var(--mantine-color-gray-light)">
                            <Title order={4}>Strikes</Title>
                            <Text>Shit Obtained</Text>
                        </Center>
                    </Grid.Col>

                </Grid>
            </SimpleGrid>
        </Container>
    );
}

export const getServerSideProps = (async (context) => {
    // Fetch data from external API
    const data = await getPlayer(`#${context.query.tag}`);
    // Pass data to the page via props
    return { props: { data: JSON.parse(JSON.stringify(data)) as Player } }
}) satisfies GetServerSideProps<{ data: Player }>
