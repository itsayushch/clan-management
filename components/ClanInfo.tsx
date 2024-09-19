import { Avatar, Text, Group, Grid, Button } from '@mantine/core';
import { IconExternalLink, IconUserCircle } from '@tabler/icons-react';
import type { Clan } from 'clashofclans.js';


export function ClanInfo({ clan }: { clan: Clan }) {
	return (
		<Grid grow>
			<Grid.Col span={10}>
				<Group wrap="nowrap">
					<Avatar
						src={clan.badge?.url}
						size={106}
						radius="xs"
					/>
					<div>
						<Text fz="md" tt="uppercase" fw={700} c="dimmed">
							Strikes dashboard
						</Text>

						<Text fz="xl" fw={500}>
							{clan.name}
						</Text>

						<Group wrap="nowrap" gap={10} mt={3}>
							<Text fz="xs" c="dimmed">
								{`${clan.tag}`}
							</Text>
						</Group>


					</div>
				</Group>

			</Grid.Col>
			<Grid.Col span={2}>
				<Group px={'lg'} preventGrowOverflow>
					<Button fullWidth rightSection={<IconUserCircle size={20} />}>Admin Login</Button>
					<Button fullWidth rightSection={<IconExternalLink size={20} />} variant='outline'>Strike Rules</Button>
				</Group>
			</Grid.Col>

		</Grid>
	);
}