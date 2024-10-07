import {
    TextInput,
    PasswordInput,
    Button,
    LoadingOverlay
} from '@mantine/core';
import { useUser } from '#lib/hooks';
import { useState } from 'react';


export function LoginForm() {
    useUser();
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: any) {
        event.preventDefault();

        if (errorMsg) setErrorMsg('');

        const body = {
            username: event.currentTarget.username.value,
            password: event.currentTarget.password.value
        };

        setLoading(true);

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (res.status === 200) {
            window.location.reload();
        } else {
            setLoading(false);
            setErrorMsg(await res.text());
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <TextInput error={!!errorMsg} label="Username" name='username' placeholder="Your Username" required />
            <PasswordInput error={errorMsg} label="Password" name='password' placeholder="Your password" required mt="md" />

            <Button fullWidth mt="xl" type="submit">
                Sign in
            </Button>
        </form>
    );
}