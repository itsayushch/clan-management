import { Table } from '@mantine/core';
import { getClanMembers } from "../lib/ClashHandler";

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import type { ClanMember } from "clashofclans.js";

export default function IndexPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {

	const rows = data.map((data) => (
		<Table.Tr key={data.name}>
			<Table.Td>{data.name}</Table.Td>
			<Table.Td>{data.tag}</Table.Td>
			<Table.Td>{data.townHallLevel}</Table.Td>
			<Table.Td>{data.role}</Table.Td>
			<Table.Td>{6.9}</Table.Td>
		</Table.Tr>
	));
	return (
		<Table>
			<Table.Thead>
				<Table.Tr>
					<Table.Th>Name</Table.Th>
					<Table.Th>Player Tag</Table.Th>
					<Table.Th>Town Hall</Table.Th>
					<Table.Th>Role</Table.Th>
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
	console.log(data[0].name);
	// Pass data to the page via props
	return { props: { data: JSON.parse(JSON.stringify(data)) as ClanMember[] } }
}) satisfies GetServerSideProps<{ data: ClanMember[] }>
