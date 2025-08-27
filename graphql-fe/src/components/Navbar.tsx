import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/auth-slice'; // adjust path
import { useRouter } from 'next/router';
import { useAppSelector } from '@/redux/hooks';
import { clearUserList } from '@/redux/slices/user-slice';

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const user = useAppSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearUserList());
        localStorage.removeItem('token')
        router.push('/signin');
    };

    if (!mounted) return null; // prevents hydration mismatch

    return (
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>

            {!user && (
                <>
                    <Link href="/signup" style={{ marginLeft: '15px' }}>Registration</Link>
                    <Link href="/signin" style={{ marginLeft: '15px' }}>Login</Link>
                </>
            )}

            {user && (
                <>
                    <Link href="/" style={{ marginLeft: '15px' }}>Users</Link>
                    <button onClick={handleLogout} style={{ cursor: 'pointer', marginLeft: '15px' }}>
                        Logout
                    </button>
                </>
            )}
        </nav>
    );
}
