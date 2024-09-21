import { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { ethers } from 'ethers';
import Onramp from './onramp';
import Offramp from './offramp';
import Link from 'next/link';

const USDC_CONTRACT_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'; // Mainnet USDC

export default function Navbar() {
  const { address, isConnected } = useAccount(); // Get wallet connection status
  const [usdcBalance, setUsdcBalance] = useState(0);

  // Fetch USDC balance when connected
  const { data: balanceData, refetch } = useBalance({
    address: address,
    token: USDC_CONTRACT_ADDRESS, // Fetch USDC balance
    chainId: 1, // Mainnet
    enabled: isConnected, // Only fetch when connected
  });

  useEffect(() => {
    if (isConnected) {
      refetch(); // Fetch balance when the user is connected
      setUsdcBalance(ethers.utils.formatUnits(balanceData?.value || 0, 6)); // Format USDC balance
    } else {
      setUsdcBalance(0); // Set balance to 0 if not connected
    }
  }, [isConnected, balanceData, refetch]);

  return (
    <header className="container mx-auto px-4 py-4 flex items-center justify-between">
      <input
        className="max-w-xs bg-gray-100 border-none p-2 rounded"
        placeholder="Search projects, creators, categories"
        type="text"
      />
      <div className="text-4xl font-serif">HANDOUT</div>
      <nav className="hidden md:flex items-center space-x-4">
        <Link className="text-gray-600 hover:text-gray-900" href="#docs">
          How it works
        </Link>
        <Onramp />
        <Offramp />
        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Display Balance */}
          <div className="text-gray-600 border-2 p-2">
            {isConnected ? `Balance: ${usdcBalance} USDC` : 'Balance : $0'}
          </div>
          {/* Wallet Button */}
          <w3m-button label={isConnected ? 'Connected' : 'Login'} />
        </div>
      </nav>
    </header>
  );
}
