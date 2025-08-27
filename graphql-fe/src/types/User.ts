export type User = {
    id: number | string;
    name: string;
    email: string;
};

export type Signup = {
    name: string;
    email: string;
    password: string;
};

export type Signin = {
    email: string;
    password: string;
};