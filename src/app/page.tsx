import Footer from '@/components/global/footer';
import Header from '@/components/global/header';
import { HomeClient } from '@/components/pages/home/client';
import { Fragment } from 'react';

export default function page() {
	return (
		<Fragment>
			<Header />
			<main>
				<section>
					<div className='min-h-hvh max-w-maxi mx-auto flex items-end md:items-start justify-center'>
						<div className='py-16 w-full max-w-96'>
							<HomeClient />
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</Fragment>
	);
}
