import { Avatar, Group, Table, Text, Flex } from '@mantine/core';
import { getClanMembers } from "../lib/ClashHandler";
import { useHover } from '@mantine/hooks';
import classes from '../assets/index.module.css';

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import type { ClanMember } from "clashofclans.js";

export default function IndexPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { hovered, ref } = useHover();
	const rows = data.map((data) => (
		<Table.Tr key={data.tag} className={classes.control}>
			<Table.Td>
				<Flex
					direction='row'
					gap='xs'
					px={10}
				>
					<Avatar size={26} src={data.league.icon.url} />
					<div>
						<Text size="sm" fw={500}>
							{data.name}
						</Text>
						<Text size="xs" c="dimmed">
							{data.role.replace('elder', 'Elder').replace('coLeader', 'Co-Leader').replace('member', 'Member').replace('leader', 'Leader')}
						</Text>
					</div>
				</Flex>
			</Table.Td>
			<Table.Td>{data.tag}</Table.Td>
			<Table.Td>
				<Group gap={'xs'}>
					<Avatar size={26} src={`https://www.clasher.us/images/coc/units/Town_Hall${data.townHallLevel}.png`} />
					{data.townHallLevel}
				</Group>
			</Table.Td>
			<Table.Td>
				<Group gap="sm">
					<Text size="sm" fw={500}>
						6.9
					</Text>
				</Group>
			</Table.Td>
		</Table.Tr>
	));
	return (
		<Table>
			<Table.Thead style={{ background: 'var(--mantine-color-dark-9)', textTransform: 'uppercase' }}>
				<Table.Tr>
					<Table.Th>Player Name</Table.Th>
					<Table.Th>Player Tag</Table.Th>
					<Table.Th>TownHall Level</Table.Th>
					<Table.Th>Strikes</Table.Th>
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>{rows}</Table.Tbody>
		</Table>
	);
}

export const getServerSideProps = (async () => {
	// Fetch data from external API
	const data = await getClanMembers('#29R0QLL80');
	// Pass data to the page via props
	return { props: { data: JSON.parse(JSON.stringify(data)) as ClanMember[] } }
}) satisfies GetServerSideProps<{ data: ClanMember[] }>
