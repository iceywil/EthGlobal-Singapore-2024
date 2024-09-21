"use client";

import Navbar from "../components/navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Marc from "../components/marquee"
export default function Handout() {
	return (
		<div className="min-h-screen bg-[#FFFBF5] flex flex-col">
			<Navbar/>
			<Marc/>
			<div className="flex flex-col items-center justify-center mt-20">
				<Link href="/pot" className="text-4xl font-bold text-black text-center px-6 py-3 border border-black rounded-full hover:bg-black hover:text-white transition-colors duration-300">Create your own pot</Link>
			</div>
		</div>
	)
}
