import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Onramp from "./components/onramp"

export default function Handout() {
	return (
		<div className="min-h-screen bg-[#FFFBF5] flex flex-col">
			<header className="container mx-auto px-4 py-4 flex items-center justify-between">
				<Input
					className="max-w-xs bg-gray-100 border-none"
					placeholder="Search projects, creators, categories"
				/>
				<div className="text-4xl font-serif">HANDOUT</div>
				<nav className="hidden md:flex items-center space-x-4">
					<Link className="text-gray-600 hover:text-gray-900" href="#docs">
						How it's working
					</Link>
					<Link className="text-gray-600 hover:text-gray-900" href="#">
						Login
					</Link>
					<Link className="text-gray-600 hover:text-gray-900" href="#">
						Deposit
					</Link>
					<Link className="text-gray-600 hover:text-gray-900" href="#">
						Withdraw
					</Link>
					<Onramp />
				</nav>
			</header>
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
					<Button className="bg-[#F7D1D1] text-black hover:bg-[#F5B8B8] text-lg px-8 py-2 rounded-full">
						Enter Handout
					</Button>
				</div>

			</main>
			<div className="h-1 bg-red-400" />
		</div>
	)
}
