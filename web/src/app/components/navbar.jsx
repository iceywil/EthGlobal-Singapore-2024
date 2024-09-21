import { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { ethers } from 'ethers';
import Onramp from './onramp';
import Offramp from './offramp';
import Link from 'next/link';
import Image from 'next/image';

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
		} else {
			setUsdcBalance(0); // Set balance to 0 if not connected
		}
	}, [isConnected, refetch]);

	useEffect(() => {
		if (balanceData && balanceData.value) {
			setUsdcBalance(ethers.utils.formatUnits(balanceData.value, 6)); // Format USDC balance
		}
	}, [balanceData]);

	return (
		<header className="container flex items-center justify-between py-2 px-4">
			{/* Input Section */}
			<div className="flex-1 basis-1/3 flex justify-start">
				<input
					className="w-full bg-gray-100 border-none p-2 rounded"
					placeholder="Search projects, creators, categories"
					type="text"
				/>
			</div>

			{/* Logo and Handout Text */}
			<div className="flex-1 basis-1/3 flex items-center justify-center space-x-4">
				<Image src="/logo.png" alt="Handout Logo" width={100} height={100} />
				<div className="text-4xl font-serif text-gray-600">HANDOUT</div>
			</div>

			{/* Navigation */}
			<nav className="flex-1 basis-1/3 flex items-center space-x-8">
				<Link className="text-gray-600 hover:text-gray-900" href="#docs">
					How it works
				</Link>
				<Onramp />
				<Offramp />
				<div className="flex items-center space-x-4">
					<div className="text-gray-600 border-2 p-2 border-black">
						{isConnected ? `Balance: ${usdcBalance} USDC` : 'Balance: 0 USDC'}
					</div>
					<w3m-button show="hide" label={isConnected ? 'Connected' : 'Login'} />
				</div>
			</nav>
		</header>
	);
}
