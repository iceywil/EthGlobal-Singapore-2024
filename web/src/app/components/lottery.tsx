"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, DollarSign, Ticket, User, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const lotteries = [
  {
    id: 1,
    name: "Mega Millions",
    drawTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    potentialWin: 100000000,
    totalDeposited: 50000000,
  },
  {
    id: 2,
    name: "Powerball",
    drawTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    potentialWin: 80000000,
    totalDeposited: 40000000,
  },
  {
    id: 3,
    name: "EuroMillions",
    drawTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    potentialWin: 120000000,
    totalDeposited: 60000000,
  },
];

const recentWinners = [
  { name: "John D.", amount: 1000000, game: "Mega Millions" },
  { name: "Sarah L.", amount: 500000, game: "Powerball" },
  { name: "Mike R.", amount: 250000, game: "EuroMillions" },
  { name: "Emma S.", amount: 750000, game: "Mega Millions" },
  { name: "David W.", amount: 100000, game: "Powerball" },
];

export default function Lottery() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [selectedLottery, setSelectedLottery] = useState<number | null>(null);
  const [balance, setBalance] = useState(1000);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [depositAmount, setDepositAmount] = useState("");
  const [userDeposits, setUserDeposits] = useState<{ [key: number]: number }>(
    {}
  );
  const [timeRemaining, setTimeRemaining] = useState<{ [key: number]: string }>(
    {}
  );
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeRemaining: { [key: number]: string } = {};
      lotteries.forEach((lottery) => {
        newTimeRemaining[lottery.id] = formatTimeRemaining(lottery.drawTime);
      });
      setTimeRemaining(newTimeRemaining);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const announcementTimer = setInterval(() => {
      setAnnouncementIndex(
        (prevIndex) => (prevIndex + 1) % recentWinners.length
      );
    }, 5000);

    return () => clearInterval(announcementTimer);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatTimeRemaining = (drawTime: Date) => {
    const now = new Date();
    const diff = drawTime.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const handleOpenDepositModal = (lotteryId: number) => {
    setSelectedLottery(lotteryId);
    setIsDepositOpen(true);
  };

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0 || amount > balance) {
      alert("Please enter a valid deposit amount not exceeding your balance.");
      return;
    }
    if (selectedLottery !== null) {
      setBalance((prevBalance) => prevBalance - amount);
      setUserDeposits((prevDeposits) => ({
        ...prevDeposits,
        [selectedLottery]: (prevDeposits[selectedLottery] || 0) + amount,
      }));
      setLoyaltyPoints((prevPoints) => prevPoints + Math.floor(amount / 10));
      setIsDepositOpen(false);
      setDepositAmount("");
      alert(
        `Successfully deposited ${formatCurrency(amount)} into ${
          lotteries.find((l) => l.id === selectedLottery)?.name
        }`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Windfall
          </h1>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <span className="text-white bg-white bg-opacity-20 rounded-full px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base">
              Balance: {formatCurrency(balance)}
            </span>
            <span className="text-white bg-white bg-opacity-20 rounded-full px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base">
              <Trophy className="inline-block mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              {loyaltyPoints} points
            </span>
            <w3m-button />
          </div>
        </header>

        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-3 sm:p-4 mb-6 sm:mb-8 overflow-hidden">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="whitespace-nowrap"
          >
            {recentWinners.map((winner, index) => (
              <span
                key={index}
                className="inline-block mr-8 sm:mr-16 text-white text-sm sm:text-base"
              >
                <Trophy className="inline-block mr-2 h-3 w-3 sm:h-4 sm:w-4 text-yellow-300" />
                {winner.name} won {formatCurrency(winner.amount)} in{" "}
                {winner.game}!
              </span>
            ))}
          </motion.div>
        </div>

        <main>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
            Current Lotteries
          </h2>
          <div className="space-y-4 sm:space-y-6">
            {lotteries.map((lottery) => (
              <Card
                key={lottery.id}
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-none shadow-lg"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col space-y-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
                        {lottery.name}
                      </h3>
                      <div className="flex items-center mb-2 text-white">
                        <Clock className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="font-mono text-sm sm:text-lg">
                          {timeRemaining[lottery.id] ||
                            formatTimeRemaining(lottery.drawTime)}
                        </span>
                      </div>
                      <motion.div
                        className="flex items-center mb-2"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <DollarSign className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-green-300" />
                        <span className="font-bold text-lg sm:text-xl text-green-300">
                          {formatCurrency(lottery.potentialWin)}
                        </span>
                      </motion.div>
                      <div className="flex items-center text-white text-sm sm:text-base">
                        <Ticket className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        <span>
                          Total Deposited:{" "}
                          {formatCurrency(lottery.totalDeposited)}
                        </span>
                      </div>
                      <div className="flex items-center mt-2 text-white text-sm sm:text-base">
                        <Ticket className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        <span>
                          Your Deposit:{" "}
                          {formatCurrency(userDeposits[lottery.id] || 0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg sm:text-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => handleOpenDepositModal(lottery.id)}
                      >
                        Deposit Now!
                      </motion.button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
        <DialogContent className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border-none shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-white">
              Deposit into Lottery
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="depositAmount" className="text-white">
                Amount ($)
              </Label>
              <Input
                id="depositAmount"
                type="number"
                placeholder="Enter deposit amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="bg-white bg-opacity-10 text-white placeholder-gray-300 border-none"
              />
            </div>
            <Button
              onClick={handleDeposit}
              className="w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-bold border-none"
            >
              Deposit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
