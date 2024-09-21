import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from 'next/image'

export default function Page({ params }: { params: { contract: string } }) {
  return (
    <div className="min-h-screen bg-[#FCF7E9] flex flex-col">
      {params.contract}
    </div>
  )
}