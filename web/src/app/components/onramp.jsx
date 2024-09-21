import { MoonPayBuyWidget } from '@moonpay/moonpay-react';
import { useState } from 'react';

export default function Onramp() {
	const [visible, setVisible] = useState(false);

	return (
		<div>
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						display: visible ? 'block' : 'none',
					}}
				>
					<MoonPayBuyWidget
						variant="embedded"
						baseCurrencyCode="usd"
						baseCurrencyAmount="100"
						defaultCurrencyCode="usdc"
						visible={visible}
					/>

			</div>
			<button className="text-gray-600 hover:text-gray-900" onClick={() => setVisible(!visible)}>
				Deposit
			</button>
		</div >
	);
}
