import { Text, Group, Grid, Button, Modal, Image, Badge } from '@mantine/core';
import { IconArrowLeft, IconPencil, IconUserCircle } from '@tabler/icons-react';
import { useUser } from '../lib/hooks';


import type { Player } from 'clashofclans.js';
import { useDisclosure } from '@mantine/hooks';
import { LoginForm } from './LoginForm';
import Router from 'next/router';
import { StrikeCheckBox } from './StrikeCheckBox';
import { getStrikeColor } from '../assets/utils';
import { PlayerModal } from '../types';

export function PlayerInfo({ player }: { player: PlayerModal }) {
    const [opened1, { open: open1, close: close1 }] = useDisclosure(false);
    const [opened2, { open: open2, close: close2 }] = useDisclosure(false);
    const user = useUser();
    return (
        <>
            <Modal
                opened={opened1}
                onClose={close1}
                title={'Add/Remove Strikes'}
                fullScreen
                radius={0}
                transitionProps={{ transition: 'fade', duration: 200 }}
            >
                <StrikeCheckBox player={player} />
            </Modal>


            <Modal
                centered
                opened={opened2}
                onClose={close2}
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
                        <Image
                            src={`https://www.clasher.us/images/coc/units/Town_Hall${player.townHallLevel}.png`}
                            h={106}
                            w={106}
                            radius="xs"
                        />
                        <div>

                            <Text fz="h3" fw={'bolder'}>
                                {player.name}
                            </Text>

                            <Group wrap="nowrap" gap={10} mt={2}>
                                <Text fz="xs" c="dimmed">
                                    {`${player.tag}`}
                                </Text>
                            </Group>
                            <Badge mt={12} color={getStrikeColor(player.totalStrikes)} variant="light" size="md" radius="sm">
                                {player.totalStrikes} Strike{player.totalStrikes > 1 ? 's' : ''}
                            </Badge>
                        </div>
                    </Group>
                </Grid.Col>
                <Grid.Col span={2}>
                    <Group px={'lg'} preventGrowOverflow>
                        {user ? (
                            <Button fullWidth color='teal' leftSection={<IconPencil size={20} />} onClick={open1} display={user ? 'block' : 'none'}>Add Strikes</Button>

                        ) : (
                            <Button fullWidth rightSection={<IconUserCircle size={20} />} onClick={open2}>Admin Login</Button>

                        )}
                        <Button fullWidth leftSection={<IconArrowLeft size={20} />} variant='outline' onClick={() => Router.push('/')}>Return Home</Button>
                    </Group>
                </Grid.Col>

            </Grid>
        </>
    );
}
