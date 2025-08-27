export interface User {
    id: number | string;
    name: string;
    email: string;
}

export interface UsersState {
    users: User[];
    loading: boolean;
    error?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
}