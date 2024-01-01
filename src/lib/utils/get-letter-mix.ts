import { CHARS } from '@/constants/app';
import { type Settings } from '../types';

export function getLetterMix(settings: Settings) {
	const { length, ...rest } = settings;

	const val = Object.entries(rest)
		.filter(([_, value]) => value)
		.map(([key]) => CHARS[key as keyof typeof CHARS])
		.reduce((a, b) => a.concat(b));

	return val;
}
