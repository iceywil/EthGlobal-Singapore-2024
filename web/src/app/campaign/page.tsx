'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const CategoryButton = ({ children, isSelected, onClick }: { children: React.ReactNode, isSelected: boolean, onClick: () => void }) => (
  <button 
    className={`px-4 py-2 rounded-full border ${isSelected ? 'bg-[#F7D1D1] text-black' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} transition-colors`}
    onClick={onClick}
  >
    {children}
  </button>
)

const FundOption = ({ icon, label, isSelected, onClick }: { icon: string; label: string; isSelected: boolean; onClick: () => void }) => (
  <button 
    className={`flex flex-col items-center justify-center w-48 h-48 border rounded-lg transition-colors ${isSelected ? 'bg-[#F7D1D1] text-black' : 'border-gray-300 hover:bg-gray-100'}`}
    onClick={onClick}
  >
    <span className="text-4xl mb-2">{icon}</span>
    <span>{label}</span>
  </button>
)

const SummaryItem = ({ label, value }: { label: string, value: string | string[] }) => (
  <div className="bg-white rounded-lg p-4 shadow-md">
    <h3 className="text-lg font-semibold mb-2 text-gray-800">{label}</h3>
    <p className="text-gray-600">{Array.isArray(value) ? value.join(', ') : value}</p>
  </div>
)

export default function Component() {
  const [step, setStep] = useState(0)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedFundOption, setSelectedFundOption] = useState<string | null>(null)
  const [selectedNeed, setSelectedNeed] = useState<string | null>(null)
  const [goalAmount, setGoalAmount] = useState('')
  const [selectedDeadline, setSelectedDeadline] = useState<string | null>(null)
  const [customMonths, setCustomMonths] = useState('')

  const categories = [
    "Animals", "Community", "Health", "Sport",
    "Education", "Enterprise", "Family", "Events", "Marriage",
    "Dream", "Humanitarian", "Emergency", "Other"
  ]

  const handleCategoryClick = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    )
  }

  const handleFundOptionClick = (option: string) => {
    setSelectedFundOption(prev => prev === option ? null : option)
  }

  const handleNeedClick = (need: string) => {
    setSelectedNeed(prev => prev === need ? null : need)
  }

  const handleDeadlineClick = (deadline: string) => {
    setSelectedDeadline(prev => prev === deadline ? null : deadline)
    if (deadline !== 'Custom') {
      setCustomMonths('')
    }
  }

  const handleCustomMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomMonths(e.target.value)
    setSelectedDeadline('Custom')
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 2))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0))

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
      <main className="flex-grow container mx-auto px-4 py-8 overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${step * 100}%)` }}>
          <section className="w-full flex-shrink-0">
            <h2 className="text-3xl font-serif mb-6 text-center text-gray-900">What's the funds for?</h2>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <CategoryButton 
                  key={category} 
                  isSelected={selectedCategories.includes(category)}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </CategoryButton>
              ))}
            </div>
            <h2 className="text-3xl font-serif mb-6 text-center text-gray-900">Who are you raising funds for?</h2>
            <div className="flex justify-center text-gray-900 gap-8">
              <FundOption 
                icon="🤲" 
                label="Yourself" 
                isSelected={selectedFundOption === 'Yourself'}
                onClick={() => handleFundOptionClick('Yourself')}
              />
              <FundOption 
                icon="🙌" 
                label="Someone else" 
                isSelected={selectedFundOption === 'Someone else'}
                onClick={() => handleFundOptionClick('Someone else')}
              />
            </div>
          </section>
          <section className="w-full flex-shrink-0 pl-4">
            <h2 className="text-3xl font-serif mb-6 text-center text-gray-900">Needs</h2>
            <div className="flex justify-center gap-4 mb-8">
              <CategoryButton
                isSelected={selectedNeed === 'Urgently'}
                onClick={() => handleNeedClick('Urgently')}
              >
                Urgently
              </CategoryButton>
              <CategoryButton
                isSelected={selectedNeed === 'Long term'}
                onClick={() => handleNeedClick('Long term')}
              >
                Long term
              </CategoryButton>
            </div>
            <h2 className="text-3xl font-serif mb-6 text-center text-gray-900">How much?</h2>
            <div className="flex justify-center text-gray-900 mb-8">
              <Input
                type="number"
                placeholder="Your goal in USD"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                className="max-w-xs bg-[#D9D9D9] border-none text-center"
                style={{ borderRadius: '20px' }}
              />
            </div>
            <h2 className="text-3xl font-serif mb-6 text-center text-gray-900">Deadline</h2>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {['None', '1 month', '3 months', '6 months'].map((deadline) => (
                <CategoryButton
                  key={deadline}
                  isSelected={selectedDeadline === deadline}
                  onClick={() => handleDeadlineClick(deadline)}
                >
                  {deadline}
                </CategoryButton>
              ))}
            </div>
            <div className="flex justify-center items-center gap-2">
              <CategoryButton
                isSelected={selectedDeadline === 'Custom'}
                onClick={() => handleDeadlineClick('Custom')}
              >
                Custom
              </CategoryButton>
              <Input
                type="number"
                placeholder="Enter months"
                value={customMonths}
                onChange={handleCustomMonthsChange}
                className="max-w-[125px] bg-[#D9D9D9] border-none text-center"
                style={{ borderRadius: '20px' }}
              />
            </div>
          </section>
          <section className="w-full flex-shrink-0 pl-4">
            <h2 className="text-3xl font-serif mb-6 text-center text-gray-900">Your Crowdfunding Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SummaryItem label="Categories" value={selectedCategories.length > 0 ? selectedCategories : 'Not selected'} />
              <SummaryItem label="Raising funds for" value={selectedFundOption || 'Not selected'} />
              <SummaryItem label="Need" value={selectedNeed || 'Not selected'} />
              <SummaryItem label="Goal amount" value={goalAmount ? `$${goalAmount}` : 'Not set'} />
              <SummaryItem label="Deadline" value={selectedDeadline === 'Custom' ? `${customMonths} months` : (selectedDeadline || 'Not selected')} />
            </div>
            <div className="mt-8 text-center">
              <Button className="bg-[#F7D1D1] text-black font-bold hover:bg-[#F5B8B8] text-lg px-8 py-2 rounded-full">
                Start your campaign
              </Button>
            </div>
          </section>
        </div>
      </main>
      <footer className="sticky bottom-0 bg-[#FCF7E9] shadow-md-top p-4">
        <div className="container mx-auto flex justify-between">
          {step > 0 && (
            <Button onClick={prevStep} className="bg-[#F7D1D1] text-black font-bold hover:bg-[#F5B8B8] rounded-full">
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
          )}
          {step < 2 && (
            <Button onClick={nextStep} className="bg-[#F7D1D1] text-black font-bold hover:bg-[#F5B8B8] rounded-full ml-auto">
              {step === 1 ? 'View Summary' : 'Next'} <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </footer>
    </div>
  )
}