import { CHARS } from '@/constants/app';
import { Settings } from '../types';

export function getLetterMix(settings: Settings) {
	const val = Object.entries(settings)
		.filter(([_, value]) => value)
		.map(([key]) => CHARS[key as keyof typeof CHARS])
		.reduce((a, b) => a.concat(b));

	return val;
}
