import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fecthHistory = createAsyncThunk('member/requestMembers', async () => {
	const data = fetch(`${process.env.PUBLIC_URL}/DB//DB/history.json`);
	const json = await data.json();
	return json.history;
});

const historySlice = createSlice({
	name: 'history',
	initialState: {
		data: [],
		isLoading: false
	},
	extraReducers: {
		[fecthHistory.pending]: state => {
			state.isLoading = true;
		},
		[fecthHistory.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fecthHistory.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		}
	}
});

export default historySlice.reducer;
