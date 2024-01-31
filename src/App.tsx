import React, { useState, useEffect } from 'react';
import './App.css';
import letters from './utils/Letters';
import Gallow from './Gallow';

function App() {
	const [word, setWord] = useState<string>('');
	const [usedLetters, setUsedLetters] = useState<string[]>([]);
	const [correctLetters, setCorrectLetters] = useState<string[]>([]);
	const [lives, setLives] = useState<number[]>([]);
	const [message, setMessage] = useState<string>('');

	const getData = async () => {
		// botijo2512@evvgo.com
		// qwertyU1!
		try {
			const response = await fetch('https://api.api-ninjas.com/v1/randomword', {
				headers: {
					'X-Api-Key': process.env.REACT_APP_API_KEY || '',
				},
			});
			const result = await response.json();
			setWord(result.word.toLowerCase());
			console.log(result.word);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const checkLetter = (letter: string) => {
		console.log('---- ',letter);
		setUsedLetters([...usedLetters, letter]);
		console.log("word----- ", word);
		if (!word.split('').includes(letter)) {
			setLives([...lives, 1]);
			if (lives.length + 1 === 6) {
				setMessage('Game Over!');
				setUsedLetters([...letters]);
			}
		} else {
			if (checkWinning([...correctLetters, letter])) {
				setMessage('You win!');
				setUsedLetters([...letters]);
			}
			setCorrectLetters([
				...correctLetters,
				...Array(checkFrequency(letter)).fill(letter),
			]);
		}
	};

	const checkWinning = (used: string[]) => {
		if (used.length === word.length) {
			return used.some((usedLetter) => {
				return word.split('').includes(usedLetter);
			});
		}
	};

	function checkFrequency(letter: string) {
		const occurrences = word.split('').filter((char) => char === letter).length;

		return occurrences;
	}

	const reset = (): void => {
		setUsedLetters([]);
		setCorrectLetters([]);
		setMessage('');
		setLives([]);
		getData();
	};

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			const pressedKey = event.key.toLowerCase();
			const isLetter = /^[a-zA-Z]$/.test(pressedKey);
			if (isLetter) {
				if (!usedLetters.includes(pressedKey) && !correctLetters.includes(pressedKey)) {
					checkLetter(pressedKey);
				}
			}
		};

		// Add event listener when the component mounts
		document.addEventListener('keydown', handleKeyPress);

		// Remove event listener when the component unmounts
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [usedLetters, correctLetters, checkLetter]);

	return (
		<div>
			<h1 className='text-3xl font-bold underline'>Hello world!</h1>
			<Gallow lives={lives} />
			<h2>{message}</h2>
			<h1 style={{ display: 'flex' }}>
				{word.split('').map((word: string, index: number) => (
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
			<div className='flex flex-wrap'>
				{letters.map((letter: string) => {
					return (
						<button
							//
							key={letter}
							className='flex justify-center mx-4 my-2 py-4 px-6 rounded-md border-solid border-2 w-11 max-w-3 content-center'
							disabled={usedLetters.includes(letter)}
							onClick={() => checkLetter(letter)}
						>
							<p>{letter.toUpperCase()}</p>
						</button>
					);
				})}
			</div>
		</div>
	);
}

export default App;
