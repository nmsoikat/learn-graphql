import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/slices/auth-slice';
import { RootState } from '../redux/store';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/redux/hooks';

export default function Login() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { status, user, token, error } = useSelector((state: RootState) => state.auth);
    const [form, setForm] = useState({ email: '', password: '' });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await dispatch(login(form));

        //true if the result.type === 'login/fulfilled'
        if (login.fulfilled.match(result)) {
            router.push('/');
        }
    };

    useEffect(() => {
        if (token) router.push('/');
    }, []);

    if (user) return <p>Signed in as {user.email}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            <button type="submit" disabled={status === 'loading'}>Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}
