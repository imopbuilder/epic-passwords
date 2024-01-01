import { CHARS } from '@/constants/app';

export function getLetterMix(payload: {
	lowercase: boolean;
	uppercase: boolean;
	digits: boolean;
	specialCharacters: boolean;
}) {
	const val = Object.entries(payload)
		.filter(([_, value]) => value)
		.map(([key]) => CHARS[key as keyof typeof CHARS])
		.reduce((a, b) => a.concat(b));

	return val;
}
