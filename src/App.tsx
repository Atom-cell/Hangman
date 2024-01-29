import React, { useState, useEffect } from 'react';
import './App.css';
import Gallow from './Gallow';

function App() {
	const letters = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'v',
		'w',
		'x',
		'y',
		'z',
	];
	const [word, setWord] = useState<string>('');
	const [usedLetters, setUsedLetters] = useState<string[]>([]);
	const [lives, setLives] = useState<number[]>([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await fetch( 'https://api.api-ninjas.com/v1/randomword', {
					headers: {
						'X-Api-Key': process.env.REACT_APP_API_KEY || ""
					 },
				});
				const result = await response.json();
				setWord(result.word);
				console.log(result.word);
			} catch (error) {
				console.error(error);
			}
		};

		getData();
	}, []);

	const checkLetter = (letter: string) => {
		setUsedLetters([...usedLetters, letter]);
		if (word.split('').includes(letter)) {
		} else {
			setLives([...lives, 1]);
			if (lives.length + 1 === 6) {
				setUsedLetters([...letters]);
			}
		}
	};

	const reset = (): void => {
		setUsedLetters([]);
		setLives([]);
	};

	// TODO add keyboard support
	return (
		<div>
			<Gallow lives={lives} />
			<h1 style={{ display: 'flex' }}>
				
				{word.split('').map((word:string, index:number) => (
					<p
						key={index}
						style={usedLetters.includes(word) ? { color: 'black' } : {}}
						className='word'
					>
						{word}
					</p>
				))}
			</h1>
			<button onClick={() => reset()}>RESET</button>
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				{letters.map((letter: string) => {
					return (
						<button
							key={letter}
							style={{
								padding: '1em',
								border: '1px solid black',
								borderRadius: '20px',
								cursor: 'pointer',
							}}
							disabled={usedLetters.includes(letter)}
							onClick={() => checkLetter(letter)}
						>
							{letter.toUpperCase()}
						</button>
					);
				})}
			</div>
		</div>
	);
}

export default App;
