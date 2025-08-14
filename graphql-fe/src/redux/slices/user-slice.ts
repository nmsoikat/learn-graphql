import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';
import client from '../../graphql/apollo-client';

interface User {
    id: string;
    name: string;
    email: string;
}

interface UsersState {
    users: User[];
    loading: boolean;
    error?: string;
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: ''
};



export const getUsers = createAsyncThunk('users/fetch', async () => {
    const res = await client.query({
        query: gql`
      query GetUsers {
        users {
          id
          name
          email
        }
      }
    `
    });

    return res.data.users;
});

export const deleteUserById = createAsyncThunk(
    'users/deleteUser',
    async (userId: string | number, { rejectWithValue }) => {
        try {
            const response = await client.mutate({
                mutation: gql`
                mutation DeleteUser($id: ID!) {
                    deleteUser(id: $id)
                }`,
                variables: {
                    id: userId,
                },
            });

            return userId;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to delete user');
        }
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            // Fetch users
            .addCase(getUsers.pending, state => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Delete user
            .addCase(deleteUserById.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user.id !== action.payload);
            })
            .addCase(deleteUserById.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

// export const { } = userSlice.actions;
export default userSlice.reducer;
