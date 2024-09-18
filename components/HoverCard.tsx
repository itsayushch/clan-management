import { HoverCard, Avatar, Text, Group, Anchor, Stack, rem } from '@mantine/core';
import { IconInfoHexagon } from '@tabler/icons-react';

export function InfoCard() {
    return (
        <Group justify="center">
            <HoverCard width={320} shadow="md" openDelay={200} closeDelay={0}>
                <HoverCard.Target>
                    <IconInfoHexagon
                        size={26}
                        stroke={1.5}
                        color="var(--mantine-color-blue-filled)"
                    />
                </HoverCard.Target>
                <HoverCard.Dropdown>
                    <Group>
                        <Avatar src="https://avatars.githubusercontent.com/u/79146003?s=200&v=4" radius="xl" />
                        <Stack gap={5}>
                            <Text size="sm" fw={700} style={{ lineHeight: 1 }}>
                                Mantine
                            </Text>
                            <Anchor
                                href="https://twitter.com/mantinedev"
                                c="dimmed"
                                size="xs"
                                style={{ lineHeight: 1 }}
                            >
                                @mantinedev
                            </Anchor>
                        </Stack>
                    </Group>

                    <Text size="sm" mt="md">
                        Customizable React components and hooks library with focus on usability, accessibility
                        and developer experience
                    </Text>

                    <Group mt="md" gap="xl">
                        <Text size="sm">
                            <b>0</b> Following
                        </Text>
                        <Text size="sm">
                            <b>1,174</b> Followers
                        </Text>
                    </Group>
                </HoverCard.Dropdown>
            </HoverCard>
        </Group>
    );
}