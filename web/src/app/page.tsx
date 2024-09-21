"use client";

import Landing from "./landing";
import Campaign from "./campaign/page";
import { MoonPayProvider } from '@moonpay/moonpay-react';

export default function Home() {
	return (
		<div>
			< MoonPayProvider
				apiKey="pk_test_k497jsJzweBMFOhxsVUtst4nysd21jSs"
				debug
			>
				<Landing />
			</MoonPayProvider >
		</div>
	);
}
