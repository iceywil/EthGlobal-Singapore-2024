import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
  return (
    <div className="min-h-screen bg-[#F0E4CC] flex flex-col">
      <header className="container mx-auto px-4 py-4 flex items-center justify-between b">
        <Input
          className="max-w-xs bg-[#D9D9D9] border-none text-center"
          placeholder="Search projects, creators, categories"
        />
        <div className="text-4xl font-serif text-gray-900 header-text">boost.fi</div>
        <nav className="hidden md:flex items-center space-x-4">
          <Link className="text-gray-600 hover:text-gray-900" href="#">
            How it's work
          </Link>
          <Link className="text-gray-600 hover:text-gray-900" href="#">
            About
          </Link>
          <Link className="text-gray-600 hover:text-gray-900" href="#">
            Login
          </Link>
          <Link className="text-gray-600 hover:text-gray-900" href="#">
            Register
          </Link>
        </nav>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-serif mb-4 text-gray-900">
          Help, without any
          <br />
          limits
          <div className="w-48 h-3 bg-red-400 mx-auto mt-2 rounded-full" />
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-900">
          The crowdfunding, rethought.
          <br />
          Where nobody loose.
        </p>
        <Button className="bg-[#F7D1D1] text-black hover:bg-[#F5B8B8] text-lg px-8 py-2 rounded-full ">
          Start a pot
        </Button>
      </main>
      <div className="h-1 bg-red-400" />
    </div>
  )
}