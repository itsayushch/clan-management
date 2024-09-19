import { Avatar, Group, Table, Text, Flex, Paper, Divider } from '@mantine/core';
import { ClanInfo } from '../components/ClanInfo';
import { getClanMembers } from "../lib/ClashHandler";
import classes from '../assets/index.module.css';
import { Badge } from '@mantine/core';

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import type { ClanMember, Clan } from "clashofclans.js";

const strikeColorScheme = {
	'0': 'teal',
	'1': 'yellow',
	'2': 'yellow',
	'3': 'orange',
	'4': 'red'
}


export default function IndexPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {

	const rows = data.members.toSorted((a, b) => b.townHallLevel - a.townHallLevel).map((data, index) => (
		<Table.Tr key={data.tag} className={classes.control}>
			<Table.Td>
				<Group gap="sm">
					<Text size="sm" fw={500}>
						{index + 1}
					</Text>
				</Group>
			</Table.Td>
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
				<Group gap={'xs'} pl={{ lg: '20' }}>
					<Avatar size={26} src={`https://www.clasher.us/images/coc/units/Town_Hall${data.townHallLevel}.png`} />
					{data.townHallLevel}
				</Group>
			</Table.Td>
			<Table.Td>
				<Group gap="sm" pl={15}>

					{/* @ts-ignore */}
					<Badge color={strikeColorScheme[data.townHallLevel - 12]} circle size="lg">{data.townHallLevel - 12}</Badge>
				</Group>
			</Table.Td>
		</Table.Tr>
	));
	
	return (
		<>
			<Paper p={'xl'} m={{ base: 'xs', sm: 'xs', md: 'lg', lg: 'xl' }} shadow="xl" radius="md" style={{ overflowX: 'auto', background: 'var(--mantine-color-dark-9)' }}>
				<ClanInfo clan={data.clan} />
			</Paper>
			<Paper mb={'xl'} mx={{ base: 'xs', sm: 'xs', md: 'lg', lg: 'xl' }} shadow="xl" radius="md" p="xs" style={{ overflowX: 'auto', background: 'var(--mantine-color-dark-9)' }}>
				<Table withRowBorders={false} horizontalSpacing={'lg'} verticalSpacing="sm">
					<Table.Thead style={{ textTransform: 'uppercase' }}>
						<Table.Tr>
							<Table.Th>#</Table.Th>
							<Table.Th>Player Name</Table.Th>
							<Table.Th>Player Tag</Table.Th>
							<Table.Th>TownHall Level</Table.Th>
							<Table.Th>Strikes</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Paper>
		</>
	);
}

export const getServerSideProps = (async () => {
	// Fetch data from external API
	const data = await getClanMembers('#29R0QLL80');
	// Pass data to the page via props
	return { props: { data: JSON.parse(JSON.stringify(data)) as PropType } }
}) satisfies GetServerSideProps<{ data: PropType }>


interface PropType {
	clan: Clan;
	members: ClanMember[];
}