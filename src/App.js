import { useState, useEffect } from "react";

function App() {
	const [counter, setValue] = useState(0);
	const [keyword, setKeyword] = useState("");
	const onClick = () => setValue((prev) => prev + 1);
	const onChange = (event) => setKeyword(event.target.value);
	console.log("I run all the time");
	useEffect(() => {
		console.log("I run only once ");
	}, []);
	useEffect(() => {
		if (keyword !== "" && keyword.length > 3) {
			console.log("I run when keyword change");
		}
	}, [keyword]);
	useEffect(() => {
		console.log("I run when counter change");
	}, [counter]);

	return (
		<div>
			<input
				value={keyword}
				onChange={onChange}
				type="text"
				placeholder="search here"
			></input>
			<h1>{counter}</h1>
			<button onClick={onClick}>Click me</button>
		</div>
	);
}

export default App;
