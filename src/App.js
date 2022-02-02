import { useEffect, useState } from "react";

function App() {
	const [loading, setLoading] = useState(true);
	const [coins, setCoins] = useState([]);
	const [dollars, setDollars] = useState(0);
	const [selectedCoin, setSelectedCoin] = useState("Bitcoin");
	const [results, setResults] = useState([]);

	const inputChange = (event) => {
		setDollars(event.target.value);
	};

	const handleSelect = () => {
		const selectBox = document.querySelector("#selectBox");
		const value = selectBox.options[selectBox.selectedIndex].value;
		setSelectedCoin(value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const selectedCoinPrice = coins.find(
			(coin) => coin.name === selectedCoin
		).quotes.USD.price;
		const coinSymbol = coins.find(
			(coin) => coin.name === selectedCoin
		).symbol;
		const dollarPerCoin = dollars ? dollars / selectedCoinPrice : 0;
		setResults([coinSymbol, dollarPerCoin]);
	};
	useEffect(() => {
		fetch("https://api.coinpaprika.com/v1/tickers")
			.then((response) => response.json())
			.then((json) => setCoins(json))
			.then(() => setLoading(false));
	}, []);

	return (
		<div>
			<h1>The Coins! {coins ? `(${coins.length})` : null}</h1>
			{loading ? (
				<strong>Loding...</strong>
			) : (
				<div>
					<form onSubmit={handleSubmit}>
						<label htmlFor="dollars">Dollars</label>
						<input
							onChange={inputChange}
							id="dollars"
							type="number"
						/>
						<label htmlFor="coin">Coin</label>
						<select
							id="selectBox"
							onChange={handleSelect}
							value={selectedCoin}
						>
							{coins.map((coin) => (
								<option key={coin.id} value={coin.name}>
									{coin.name}
								</option>
							))}
						</select>
						<button>Exchange</button>
					</form>
					<h1>
						{results.length === 0
							? null
							: `${results[0]} : ${results[1]}`}
					</h1>
				</div>
			)}
		</div>
	);
}

export default App;
