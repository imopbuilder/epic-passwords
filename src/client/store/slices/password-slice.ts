import { Settings } from '@/lib/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PasswordState {
	strength: number;
	password: string | null;
	settings: Settings;
}

const initialState: PasswordState = {
	strength: 5,
	password: null,
	settings: {
		length: 8,
		lowercase: true,
		uppercase: true,
		digits: true,
		specialCharacters: true,
	},
};

const slice = createSlice({
	name: 'client',
	initialState,
	reducers: {
		setstrength: (state, action: PayloadAction<PasswordState['strength']>) => {
			state.strength = action.payload;
		},
		setpassword: (state, action: PayloadAction<PasswordState['password']>) => {
			state.password = action.payload;
		},
		setsettings: (state, action: PayloadAction<Partial<PasswordState['settings']>>) => {
			state.settings = {
				...state.settings,
				...action.payload,
			};
		},
	},
});

export const { setstrength, setpassword, setsettings } = slice.actions;
export default slice.reducer;
