import { CHARS } from '@/constants/app';
import crypto from 'crypto';
import { type Settings } from '../types';

// lowercase
function containsLowerCase(str: string, isLowercase: boolean): boolean {
	return isLowercase ? CHARS.lowercase.some((x) => str.includes(x)) : true;
}

// uppercase
function containsUpperCase(str: string, isUppercase: boolean): boolean {
	return isUppercase ? CHARS.uppercase.some((x) => str.includes(x)) : true;
}

// digits
function containsDigits(str: string, isDigits: boolean): boolean {
	return isDigits ? CHARS.digits.some((x) => str.includes(x)) : true;
}

// special-characters
function containsSpecialCharacters(str: string, isSpecialCharacters: boolean): boolean {
	return isSpecialCharacters ? CHARS.specialCharacters.some((x) => str.includes(x)) : true;
}

function isValidPassword(password: string, settings: Settings) {
	return (
		containsLowerCase(password, settings.lowercase) &&
		containsUpperCase(password, settings.uppercase) &&
		containsDigits(password, settings.digits) &&
		containsSpecialCharacters(password, settings.specialCharacters)
	);
}

export function generateStrongPassword(settings: Settings, LETTERS_MIX: string[]): string {
	const buff = new Uint8Array(settings.length);
	const CHARS_LENGTH = LETTERS_MIX.length;
	const getCrypto = typeof window !== 'undefined' ? window.crypto : crypto;

	let generatedPassword = '';

	do {
		(getCrypto as Crypto).getRandomValues(buff);
		generatedPassword = [...buff].map((x) => LETTERS_MIX[x % CHARS_LENGTH]).join('');
	} while (!isValidPassword(generatedPassword, settings));

	return generatedPassword;
}
