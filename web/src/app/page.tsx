"use client";

import dynamic from 'next/dynamic';

// Dynamically import the Handout component with SSR disabled
const Handout = dynamic(() => import('./handout'), { ssr: false });

export default function Home() {
	return (
		<main>
			<Handout />
		</main>
	);
}
