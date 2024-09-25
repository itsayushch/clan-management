import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Center, Checkbox, Group, SimpleGrid, Stack, Text, Dialog, Button, TextInput } from '@mantine/core';
import classes from '../assets/StrikeCheckBox.module.css';
import { rules, compareArrays } from '../assets/utils';



export function StrikeCheckBox() {
    let original = ['1', '6', '9']
    const [value, setValue] = useState<string[]>(original);
    const [opened, { toggle, close }] = useDisclosure(false);

    const handleCheckBoxChange = (value: string[]) => {
        setValue(value)
        if (opened && compareArrays(original, value.sort())) return close();
        if (!opened) return toggle();

    }

    const resetChange = () => {
        setValue(original)
        return close();
    }

    const submitChange = (value: string[]) => {
        original = value.sort();
    }

    const cards = rules.map((item) => (
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
            <Dialog opened={opened} onClose={close}  size="xl" radius="md" style={{ background: 'var(--mantine-color-gray-9)' }}>


                <Group align="flex-end">
                    <Text size="sm" mb="xs" fw={500} >
                        Changes detected! Please save or cancel.
                    </Text>
                    <Button onClick={close} variant='light' color='teal'>Save</Button>
                    <Button onClick={resetChange} variant='light' color='red'>Cancel</Button>
                </Group>
            </Dialog>
            <Center p={'xl'}>

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