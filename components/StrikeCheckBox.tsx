import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Center, Checkbox, Group, SimpleGrid, Stack, Text, Dialog, Button, TextInput } from '@mantine/core';
import classes from '#assets/StrikeCheckBox.module.css';
import { rules, compareArrays } from '#assets/utils';
import { PlayerModal } from '#types';



export function StrikeCheckBox({ player }: { player: PlayerModal }) {
    let original = player?.strikes?.strike?.map(m => m.uid.toString()) ?? []
    const uids = rules.filter(item => !original.includes(item.uid.toString())).toSorted();

    const [value, setValue] = useState<string[]>(original);
    const [opened, { toggle, close }] = useDisclosure(false);


    const handleCheckBoxChange = (newValue: string[]) => {
        setValue(newValue)

        if (opened && compareArrays(original, value.sort())) return close();
        if (!opened) return toggle();

    }

    const resetChange = () => {
        setValue(original)
        return close();
    }

    const submitChange = async () => {
        const uids = value.filter(item => !original.includes(item)).toSorted();
        close();
        const res = await fetch('/api/update-strike', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerTag: player.tag,
                uids
            })
        });

        if (res.status === 200) {
            window.location.reload();
        } else {
            window.alert(await res.text());
            return resetChange();
        }
    }

    const cards = uids.map((item) => (
        <Checkbox.Card className={classes.root} radius="md" value={item.uid.toString()} key={item.uid}>
            <Group wrap="nowrap" align="flex-start">
                <Checkbox.Indicator />
                <div>
                    <Text fw={500} size="sm" c="dimmed" lh={1} style={{ textTransform: 'uppercase' }}>
                        {`${item.value} Strike${item.value > 1 ? 's' : ''}`}
                    </Text>
                    <Text size="lg" lh={1} mt={6}>
                        {item.reason}
                    </Text>
                </div>
            </Group>
        </Checkbox.Card>
    ));

    return (
        <>
            <Dialog opened={opened} onClose={close} size="xl" radius="md" style={{ background: 'var(--mantine-color-gray-9)' }}>


                <Group align="flex-end">
                    <Text size="sm" mb="xs" fw={500} >
                        Changes detected! Please save or cancel.
                    </Text>
                    <Button onClick={submitChange} variant='light' color='teal'>Save</Button>
                    <Button onClick={resetChange} variant='light' color='red'>Cancel</Button>
                </Group>
            </Dialog>
            <Center p={'xl'} mb={'10rem'}>

                <Checkbox.Group
                    value={value}
                    onChange={handleCheckBoxChange}
                >

                    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>{cards}</SimpleGrid>

                </Checkbox.Group>

            </Center>
        </>
    );
}