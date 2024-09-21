import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from 'next/image'

export default function Component() {
  return (
    <div className="min-h-screen bg-[#FCF7E9] flex flex-col">
      <div className="w-full border-b-[2px] border-[#D42A20]">
        <header className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex-1 flex justify-start">
            <Input
              className="max-w-xs bg-[#D9D9D9] border-none text-center"
              placeholder="Search projects, creators, categories"
              style={{ borderRadius: '20px' }}
            />
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="/handsup.png"
              alt="handsUp Logo"
              width={80}
              height={20}
              className="header-logo"
            />
          </div>
          <nav className="flex-1 hidden md:flex items-center justify-end space-x-10">
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
      </div>
      <main className="flex-grow flex flex-col items-center justify-center px-4 mt-[50px]">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-4">
            Help, without any
            <br />
            limits
            <Image
              src="/doodle1.png"
              alt="Decorative line"
              width={192}
              height={8}
              className="mx-auto mt-2"
            />
          </h1>
          <p className="text-2xl md:text-3xl mb-6 text-gray-900">
            The crowdfunding, rethought.
            <br />
            Where everyone wins.
          </p>
        </div>
        <Link href="/campaign">
          <Button className="bg-[#F7D1D1] text-black font-bold hover:bg-[#F5B8B8] text-lg px-8 py-2 rounded-full">
            Start a pot
          </Button>
        </Link>
      </main>
    </div>
  )
}