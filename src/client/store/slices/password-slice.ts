import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ClientState {
	showGenerator: boolean;
}

const initialState: ClientState = {
	showGenerator: false,
};

const slice = createSlice({
	name: 'client',
	initialState,
	reducers: {
		setshowgenerator: (state, action: PayloadAction<Partial<ClientState['showGenerator']>>) => {
			state.showGenerator = action.payload;
		},
	},
});

export const { setshowgenerator } = slice.actions;
export default slice.reducer;
