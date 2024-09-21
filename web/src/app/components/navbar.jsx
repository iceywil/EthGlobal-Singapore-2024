"use client"
import { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { formatUnits } from 'ethers'; // Import formatUnits from ethers
import Link from 'next/link';
import Image from 'next/image';
import { Input } from "@/components/ui/input"

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
			setUsdcBalance(formatUnits(balanceData.value, 6)); // Format USDC balance using formatUnits
		}
	}, [balanceData]);

	return (

		<header className="container mx-auto px-4 py-4 flex items-center justify-between">

			<div className="flex-1 basis-1/3 flex justify-start">
				<Input
					className="max-w-xs bg-[#D9D9D9] border-none text-center"
					placeholder="Search projects, creators, categories"
					style={{ borderRadius: '20px' }}
				/>
			</div>
			<Link href="/" className="flex-1 basis-1/3 flex justify-center">
				<Image
					src="/handsup.png"
					alt="handsUp Logo"
					width={80}
					height={20}
					className="header-logo"
				/>
			</Link>
			<nav className="flex-1 basis-1/3 flex items-center justify-end space-x-8">
				<div className="flex items-center space-x-4">
					{isConnected && (
						<div className="text-gray-600 border-2 p-2 border-black rounded-full">
							Balance: {usdcBalance} USDC
						</div>
					)}
					<w3m-button balance="hide" label={isConnected ? 'Connected' : 'Login'} />
				</div>
			</nav>
		</header>

	);
}

