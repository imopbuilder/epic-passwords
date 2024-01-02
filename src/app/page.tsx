import Footer from '@/components/global/footer';
import Header from '@/components/global/header';
import { GeneratePasswordForm } from '@/components/pages/home/client';
import { generateStrongPassword } from '@/lib/utils/generate-strong-password';
import { getLetterMix } from '@/lib/utils/get-letter-mix';
import { Fragment } from 'react';

export default function page() {
	const settings = {
		length: 8,
		lowercase: true,
		uppercase: true,
		digits: true,
		specialCharacters: true,
	};
	const LETTER_MIX = getLetterMix(settings);

	const initialPassword = generateStrongPassword(settings, LETTER_MIX);

	return (
		<Fragment>
			<Header />
			<main>
				<section>
					<div className='min-h-hvh max-w-maxi mx-auto flex items-start justify-center'>
						<div className='py-16 w-full mx-[4%] sm:mx-0 sm:max-w-96'>
							<GeneratePasswordForm initialPassword={initialPassword} />
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</Fragment>
	);
}

export const dynamic = 'force-dynamic';
