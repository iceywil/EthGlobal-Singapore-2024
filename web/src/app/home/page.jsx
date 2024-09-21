"use client";

import Navbar from "../components/navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Handout() {
	return (
		<div className="min-h-screen bg-[#FFFBF5] flex flex-col">
			<Navbar/>
			<main className="flex-grow flex flex-col items-center justify-center text-center px-4">
				<h1 className="text-5xl md:text-7xl font-serif mb-4">
					Help, without any
					<br />
					limits
					<div className="w-48 h-3 bg-red-400 mx-auto mt-2 rounded-full" />
				</h1>
				<p className="text-xl md:text-2xl mb-8">
					The crowdfunding, rethought.
					<br />
					Where nobody loose.
				</p>
				<div>
					<Link href="#home">
						<Button className="bg-[#F7D1D1] text-black hover:bg-[#F5B8B8] text-lg px-8 py-2 rounded-full">
							Launch App
						</Button>
					</Link>
				</div>

			</main>
			<div className="h-1 bg-red-400" />
		</div>
	)
}
