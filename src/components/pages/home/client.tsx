'use client';

import { useCopy } from '@/client/hooks/use-copy.hook';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { generateStrongPassword } from '@/lib/utils/generate-strong-password';
import { getLetterMix } from '@/lib/utils/get-letter-mix';
import { Copy, MoveRight } from 'lucide-react';
import { useState } from 'react';

export function HomeClient() {
	return (
		<div>
			<GeneratePasswordForm />
		</div>
	);
}

function GeneratePasswordForm() {
	const { handleCopy } = useCopy();
	const [password, setPassword] = useState('some random password');

	const [progress, setProgress] = useState(13);
	const [lowercase, setlowercase] = useState(true);
	const [uppercase, setUppercase] = useState(true);
	const [digits, setDigits] = useState(true);
	const [specialCharacters, setSpecialCharacters] = useState(true);
	const [length, setLength] = useState(8);

	const [loading, setLoading] = useState(false);

	function handleGeneratePassword() {
		setLoading(true);

		// Settings to generate the password
		const settings = {
			length,
			lowercase,
			uppercase,
			digits,
			specialCharacters,
		};

		// Get the letters in array of string based on the settings
		const LETTER_MIX = getLetterMix(settings);

		// Generate strong password based on the LETTER_MIX and settings
		const generatedPassword = generateStrongPassword(settings, LETTER_MIX);
		setPassword(generatedPassword);
		setLoading(false);
	}

	function handleCopyPassword() {
		handleCopy(password);
	}

	return (
		<div>
			<p className='p-2 px-3 border rounded-md mb-3 text-muted-foreground text-sm h-11 flex items-center justify-start'>{password}</p>
			<div className='space-y-3'>
				<div className='pb-2 pt-1'>
					<Progress className='w-full' value={progress} />
				</div>
				<div className='flex items-center justify-between border p-3 rounded-md'>
					<Label htmlFor='lowercase-letters'>Lowercase Letters</Label>
					<Switch id='lowercase-letters' checked={lowercase} onCheckedChange={setlowercase} />
				</div>
				<div className='flex items-center justify-between border p-3 rounded-md'>
					<Label htmlFor='uppercase-letters'>Uppercase Letters</Label>
					<Switch id='uppercase-letters' checked={uppercase} onCheckedChange={setUppercase} />
				</div>
				<div className='flex items-center justify-between border p-3 rounded-md'>
					<Label htmlFor='digits'>Digits</Label>
					<Switch id='digits' checked={digits} onCheckedChange={setDigits} />
				</div>
				<div className='flex items-center justify-between border p-3 rounded-md'>
					<Label htmlFor='special-characters'>Special Characters</Label>
					<Switch id='special-characters' checked={specialCharacters} onCheckedChange={setSpecialCharacters} />
				</div>
				<div className='border p-3 rounded-md'>
					<div className='flex items-center justify-between pb-1'>
						<Label>Length</Label>
						<span className='text-sm font-bold'>{length}</span>
					</div>
					<Slider
						id='length'
						className='py-2'
						value={[length]}
						defaultValue={[length]}
						max={50}
						step={1}
						onValueChange={(val) => setLength(Math.max(val[0], 8))}
					/>
				</div>
				<Button className='w-full group' size='lg' onClick={handleGeneratePassword} disabled={loading}>
					Generate Password
					<MoveRight
						size={16}
						strokeWidth={2.5}
						className='ml-auto invisible -translate-x-2 duration-100 scale-x-90 opacity-0 group-hover:visible group-hover:-translate-x-0 group-hover:opacity-100'
					/>
				</Button>
				<Button className='w-full group' size='lg' variant='secondary' onClick={handleCopyPassword}>
					Copy Password
					<Copy
						size={16}
						strokeWidth={2.5}
						className='ml-auto invisible -translate-x-2 duration-100 scale-x-90 opacity-0 group-hover:visible group-hover:-translate-x-0 group-hover:opacity-100'
					/>
				</Button>
			</div>
		</div>
	);
}
