"use client";

import Navbar from "../components/navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MoonPayProvider } from '@moonpay/moonpay-react';

export default function Pot() {
	return (
		< MoonPayProvider
		apiKey="pk_test_k497jsJzweBMFOhxsVUtst4nysd21jSs"
		debug
	>
		<div className="min-h-screen bg-[#FFFBF5] flex flex-col">
			<Navbar/>
		</div>
		</MoonPayProvider>
	)
}
