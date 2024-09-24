import { Avatar, Text, Group, Grid, Button, Modal } from '@mantine/core';
import { IconExternalLink, IconUserCircle } from '@tabler/icons-react';
import { useUser } from '../lib/hooks';


import type { Clan } from 'clashofclans.js';
import { useDisclosure } from '@mantine/hooks';
import { LoginForm } from './LoginForm';
import Router from 'next/router';

export function ClanInfo({ clan }: { clan: Clan }) {
	const [opened, { open, close }] = useDisclosure(false);
	const user = useUser();
	return (
		<>
			<Modal
				centered
				opened={opened}
				onClose={close}
				title={<h1>Admin Login</h1>}
				overlayProps={{
					backgroundOpacity: 0.55,
					blur: 3,
				}}
			>
				<LoginForm />
			</Modal>
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
						{user ? (
							<Button fullWidth rightSection={<IconUserCircle size={20} />}  onClick={() => Router.push('/api/logout')}>Log Out</Button>
						) : (
							<Button fullWidth rightSection={<IconUserCircle size={20} />} onClick={open}>Admin Login</Button>
						)}
						<Button fullWidth rightSection={<IconExternalLink size={20} />} variant='outline'>Strike Rules</Button>
					</Group>
				</Grid.Col>

			</Grid>
		</>
	);
}
