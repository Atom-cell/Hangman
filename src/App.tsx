import React, { useState, useEffect } from 'react';
import './App.css';
import letters from './utils/Letters';
import Gallow from './Gallow';
import { FaRedo } from 'react-icons/fa';
import Loader from './Loader';

interface Score {
	W:number,
	L:number
}
function App() {
	const [word, setWord] = useState<string>('');
	const [usedLetters, setUsedLetters] = useState<string[]>([]);
	const [correctLetters, setCorrectLetters] = useState<string[]>([]);
	const [lives, setLives] = useState<number[]>([]);
	const [message, setMessage] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [scores, setScores] = useState<Score>({W:0, L:0});

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
		// console.log('---- ', letter);
		setUsedLetters([...usedLetters, letter]);
		// console.log('word----- ', word);
		if (!word.split('').includes(letter)) {
			setLives([...lives, 1]);
			if (lives.length + 1 === 6) {
				setMessage('Game Over!');
				setScores({W:scores.W, L:scores.L+1});
				setUsedLetters([...letters]);
			}
		} else {
			if (checkWinning([...correctLetters, letter])) {
				setMessage('You win!');
				setScores({W:scores.W+1, L:scores.L});
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
		setUsedLetters([...letters]);
		getData().then(() => {
			setUsedLetters([]);
			setCorrectLetters([]);
			setMessage('');
			setLives([]);
		});
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
		<div className='font-mono flex flex-col justify-center items-center'>
			<h2 className='text-white text-4xl mb-5 h-8'>{message}</h2>
			{/* <h1 className='text-white text-4xl'>HANGMAN</h1> */}
			<div className='flex justify-between relative space-x-60'>
				<h1 className='text-2xl'>W:{" "}{scores.W}</h1>
				<Gallow lives={lives} />
				<h1 className='text-2xl'>L:{" "}{scores.L}</h1>
			</div>

			<div className='mb-10 mt-7'>
				{!loading ? (
					<h1 style={{ display: 'flex' }}>
						{word.split('').map((word: string, index: number) => (
							<p
								key={index}
								className={`border-b-4 border-white w-10 text-center mx-3 text-3xl ${
									usedLetters.includes(word) ? 'text-white' : 'text-gray-900'
								}`}
							>
								{word}
							</p>
						))}
					</h1>
				) : null}
			</div>

			<div className='flex flex-wrap md:w-full lg:w-2/4 px-2'>
				{letters.map((letter: string) => {
					return (
						<div className='w-11 border-solid mx-4 my-2'>
							<button
								key={letter}
								className={`${
									usedLetters.includes(letter)
										? 'bg-gray-400 text-black'
										: 'bg-gray-800 hover:bg-gray-600 text-white'
								}  py-4 px-6 rounded border-solid border-2 flex justify-items-stretch transition-transform duration-300 ease-in-out transform hover:translate-y-px `}
								disabled={usedLetters.includes(letter)}
								onClick={() => checkLetter(letter)}
							>
								{letter.toUpperCase()}
							</button>
						</div>
					);
				})}
			</div>

			<button
				className='bg-amber-400 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded flex justify-center items-center mt-5'
				onClick={() => !loading && reset()}
			>
				{loading ? (
					<Loader />
				) : (
					<>
						<FaRedo className='mr-2' /> RESET
					</>
				)}
			</button>
		</div>
	);
}

export default App;
