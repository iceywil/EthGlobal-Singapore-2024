"use client";

import Handout from "./handout";
import { MoonPayProvider } from '@moonpay/moonpay-react';

export default function Home() {
	return (
		<div>
			< MoonPayProvider
				apiKey="pk_test_k497jsJzweBMFOhxsVUtst4nysd21jSs"
				debug
			>
				<Handout />
			</MoonPayProvider >
		</div>
	);
}
