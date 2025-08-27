- Redux and RTK both solve the same problem. RTK just makes Redux easier, faster, and more modern.
- Redux Toolkit (RTK) is built on top of Redux. It’s not a replacement — it’s a modern layer on top of Redux that makes it easier to use.
- When we have installed Redux Toolkit, also installed Redux as a dependency.

createSlice: Simplifies the process of writing Redux logic by automatically generating action creators and action types along with the reducer.

Reducer: A reducer is a pure function in Redux that takes the current state and an action, and returns the new state.

extraReducers: While reducers handles local actions, extraReducers lets you respond to external or async actions (e.g., API calls).

createAsyncThunk: It generates a thunk function that dispatches pending, fulfilled, and rejected actions based on a Promise.

Thunk Function: A function that returns a function — used for async logic in Redux

Action type and Action creators: The action type is the key, and the action creator is the helper that produces actions of that type.

Builder: The builder is an object that gives you methods (like .addCase()) to define how your slice reducer should respond to external actions.

.addCase(): When this specific action type is dispatched, run this reducer logic.