import React, { useState, useEffect } from 'react';
import './App.css';
import letters from './utils/Letters';
import Gallow from './Gallow';
import { FaRedo } from 'react-icons/fa';
import Loader from './Loader';

function App() {
	const [word, setWord] = useState<string>('');
	const [usedLetters, setUsedLetters] = useState<string[]>([]);
	const [correctLetters, setCorrectLetters] = useState<string[]>([]);
	const [lives, setLives] = useState<number[]>([]);
	const [message, setMessage] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const getData = async () => {
		// botijo2512@evvgo.com
		// qwertyU1!
		setLoading(true);
		try {
			const response = await fetch('https://api.api-ninjas.com/v1/randomword', {
				headers: {
					'X-Api-Key': process.env.REACT_APP_API_KEY || '',
				},
			});
			const result = await response.json();
			setWord(result.word.toLowerCase());
			console.log(result.word);
			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		// getData();
	}, []);

	const checkLetter = (letter: string) => {
		console.log('---- ', letter);
		setUsedLetters([...usedLetters, letter]);
		console.log('word----- ', word);
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
				if (
					!usedLetters.includes(pressedKey) &&
					!correctLetters.includes(pressedKey)
				) {
					checkLetter(pressedKey);
				}
			}
		};

		document.addEventListener('keydown', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [usedLetters, correctLetters, checkLetter]);

	return (
		<div className='font-mono w-2/4 h-full flex flex-col justify-center items-center'>
			<h1 className='text-white text-4xl'>HANGMAN</h1>
			<Gallow lives={lives} />
			<h2>{message}</h2>

			{loading ? (
				<Loader />
			) : (
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
			)}

			<button
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center'
				onClick={() => reset()}
			>
				<FaRedo className='mr-2' /> RESET
			</button>
			<div className='flex flex-wrap'>
				{letters.map((letter: string) => {
					return (
						<div className='w-11 border-solid mx-4 my-2'>
							<button
								key={letter}
								className={`${
									usedLetters.includes(letter)
										? 'bg-gray-800'
										: 'bg-green-800 hover:bg-green-700'
								} text-white py-4 px-6 rounded border-solid border-2 transition-transform duration-300 ease-in-out transform hover:translate-y-px active:translate-y-0`}
								disabled={usedLetters.includes(letter)}
								onClick={() => checkLetter(letter)}
							>
								{letter.toUpperCase()}
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
