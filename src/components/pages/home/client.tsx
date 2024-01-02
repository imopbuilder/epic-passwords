'use client';

import { useCopy } from '@/client/hooks/use-copy.hook';
import { dispatch, useAppSelector } from '@/client/store';
import { setpassword, setsettings, setstrength } from '@/client/store/slices/password-slice';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { MAX_PASSWORD_STRENGTH } from '@/constants/app';
import { Settings } from '@/lib/types';
import { calculatePasswordStrength } from '@/lib/utils/calculate-password-strength';
import { cn } from '@/lib/utils/cn';
import { generateStrongPassword } from '@/lib/utils/generate-strong-password';
import { getLetterMix } from '@/lib/utils/get-letter-mix';
import { Copy, MoveRight } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import { toast } from 'sonner';

export function GeneratePasswordForm(props: { initialPassword: string }) {
	const { password } = useAppSelector((state) => state.passwordSlice);

	useEffect(() => {
		dispatch(setpassword(props.initialPassword));
	}, [props.initialPassword]);

	return (
		<div>
			<p className='p-2 px-3 font-semibold border rounded-md mb-3 text-muted-foreground text-sm h-11 flex items-center justify-start'>
				{password ?? props.initialPassword}
			</p>
			<div className='space-y-3'>
				<StrengthBar {...props} />
				<PasswordSettings />
				<GeneratePasswordBtn />
				<CopyPasswordBtn />
			</div>
		</div>
	);
}

function StrengthBar({ initialPassword }: { initialPassword: string }) {
	const { strength, password } = useAppSelector((state) => state.passwordSlice);

	function generateClassName() {
		if (strength > 4) return 'bg-green-400';
		if (strength > 3) return 'bg-yellow-300';
		if (strength > 2) return 'bg-orange-400';
		if (strength > 1) return 'bg-rose-500';
		if (strength > 0) return 'bg-red-600';
		return 'bg-muted';
	}

	useEffect(() => {
		// Get the strength of the password based on password
		const passwordStrength = calculatePasswordStrength(password ?? initialPassword);

		dispatch(setstrength(passwordStrength.value));
	}, [password, initialPassword]);

	return (
		<div className='py-1 flex items-center justify-center gap-3'>
			{Array.from({ length: strength }).map((_, index) => (
				<span key={`${index}`} className={cn('h-2 w-full rounded-full', generateClassName())} />
			))}
			{Array.from({ length: MAX_PASSWORD_STRENGTH - strength }).map((_, index) => (
				<span key={`${index}`} className='h-2 w-full rounded-full bg-muted' />
			))}
		</div>
	);
}

function PasswordSettings() {
	const { length, lowercase, uppercase, digits, specialCharacters } = useAppSelector((state) => state.passwordSlice).settings;

	function handleChange(property: keyof Omit<Settings, 'length'>, value: boolean) {
		dispatch(setsettings({ [property]: value }));
	}

	return (
		<Fragment>
			<div className='border rounded-md'>
				<div className='flex items-center justify-between p-3'>
					<Label htmlFor='lowercase-letters'>Lowercase Letters</Label>
					<Switch id='lowercase-letters' checked={lowercase} onCheckedChange={(val) => handleChange('lowercase', val)} />
				</div>
				<hr />
				<div className='flex items-center justify-between p-3'>
					<Label htmlFor='uppercase-letters'>Uppercase Letters</Label>
					<Switch id='uppercase-letters' checked={uppercase} onCheckedChange={(val) => handleChange('uppercase', val)} />
				</div>
				<hr />
				<div className='flex items-center justify-between p-3'>
					<Label htmlFor='digits'>Digits</Label>
					<Switch id='digits' checked={digits} onCheckedChange={(val) => handleChange('digits', val)} />
				</div>
				<hr />
				<div className='flex items-center justify-between p-3'>
					<Label htmlFor='special-characters'>Special Characters</Label>
					<Switch id='special-characters' checked={specialCharacters} onCheckedChange={(val) => handleChange('specialCharacters', val)} />
				</div>
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
					onValueChange={(val) => dispatch(setsettings({ length: Math.max(val[0], 8) }))}
				/>
			</div>
		</Fragment>
	);
}

function GeneratePasswordBtn() {
	const [loading, setLoading] = useState(false);
	const { length, lowercase, uppercase, digits, specialCharacters } = useAppSelector((state) => state.passwordSlice).settings;

	function handleGeneratePassword() {
		if (!(lowercase || uppercase || digits || specialCharacters)) return toast.info('Please select atleast one criterion');

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

		dispatch(setpassword(generatedPassword));
		setLoading(false);
	}

	return (
		<Button className='w-full group' size='lg' onClick={handleGeneratePassword} disabled={loading}>
			Generate Password
			<MoveRight
				size={16}
				strokeWidth={2.5}
				className='ml-auto invisible -translate-x-2 duration-100 scale-x-90 opacity-0 group-hover:visible group-hover:-translate-x-0 group-hover:opacity-100'
			/>
		</Button>
	);
}

function CopyPasswordBtn() {
	const { handleCopy } = useCopy();
	const { password } = useAppSelector((state) => state.passwordSlice);

	return (
		<Button className='w-full group' size='lg' variant='secondary' onClick={() => handleCopy(password ?? '')}>
			Copy Password
			<Copy
				size={16}
				strokeWidth={2.5}
				className='ml-auto invisible -translate-x-2 duration-100 scale-x-90 opacity-0 group-hover:visible group-hover:-translate-x-0 group-hover:opacity-100'
			/>
		</Button>
	);
}
