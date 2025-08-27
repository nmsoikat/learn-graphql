import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../graphql/apollo-client';
import { gql } from '@apollo/client';
import { AuthState } from '@/interfaces/User';
import { Signin, Signup } from '@/types/User';

const signupMutation = gql`
  mutation Signup($input: CreateUserInput!) {
    createUser(input:$input) {
      id name email
    }
  }
`;
const loginMutation = gql`
  mutation Login($input: LoginInput!) {
    login(input:$input)
  }
`;

export const signup = createAsyncThunk('auth/signup', async (data: Signup, { rejectWithValue }) => {
  try {
    const res = await client.mutate({ mutation: signupMutation, variables: { input: data } });
    return res.data.createUser;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const login = createAsyncThunk('auth/login', async (data: Signin, { rejectWithValue }) => {
  try {
    const res = await client.mutate({ mutation: loginMutation, variables: { input: data } });
    localStorage.setItem('token', res.data.login);
    return res.data.login;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

const initialState: AuthState = {
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  status: 'idle',
  error: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
    }
  },
  extraReducers: builder => {
    // Signup
    builder
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        // state.user = action.payload.user;
        state.token = action.payload;
        state.status = 'succeeded';
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
