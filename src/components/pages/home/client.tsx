'use client';

import { useCopy } from '@/client/hooks/use-copy.hook';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Copy, MoveRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export function HomeClient() {
	return (
		<div>
			<GeneratePasswordForm />
		</div>
	);
}

function GeneratePasswordForm() {
	const { handleCopy } = useCopy();
	const [password, setPassword] = useState('');

	const [progress, setProgress] = useState(13);
	const [lowercase, setlowercase] = useState(true);
	const [uppercase, setUppercase] = useState(true);
	const [digits, setDigits] = useState(true);
	const [specialCharacters, setSpecialCharacters] = useState(true);

	function handleGeneratePassword() {
		console.log(lowercase, uppercase, digits, specialCharacters);
	}

	function handleCopyPassword() {
		handleCopy(password);
	}

	useEffect(() => {
		setPassword('some random password');
	}, []);

	return (
		<div>
			<p className='p-2 border rounded-md mb-5 text-muted-foreground text-sm h-10 flex items-center justify-start'>{password}</p>
			<div className='space-y-5'>
				<Progress value={progress} className='w-full' />
				<div className='flex items-center justify-between'>
					<Label htmlFor='lowercase-letters'>Lowercase Letters</Label>
					<Switch id='lowercase-letters' checked={lowercase} onCheckedChange={setlowercase} />
				</div>
				<div className='flex items-center justify-between'>
					<Label htmlFor='uppercase-letters'>Uppercase Letters</Label>
					<Switch id='uppercase-letters' checked={uppercase} onCheckedChange={setUppercase} />
				</div>
				<div className='flex items-center justify-between'>
					<Label htmlFor='digits'>Digits</Label>
					<Switch id='digits' checked={digits} onCheckedChange={setDigits} />
				</div>
				<div className='flex items-center justify-between'>
					<Label htmlFor='special-characters'>Special Characters</Label>
					<Switch id='special-characters' checked={specialCharacters} onCheckedChange={setSpecialCharacters} />
				</div>
				<Slider defaultValue={[50]} max={100} step={1} />
				<Button className='w-full group' size='lg' onClick={handleGeneratePassword}>
					Generate Password
					<MoveRight
						size={16}
						strokeWidth={2.5}
						className='ml-auto invisible -translate-x-2 duration-100 scale-x-90 opacity-0 group-hover:visible group-hover:-translate-x-0 group-hover:opacity-100'
					/>
				</Button>
				<Button className='w-full group' size='lg' onClick={handleCopyPassword}>
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
