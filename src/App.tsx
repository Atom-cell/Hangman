import React, { useState } from 'react';
import './App.css';

function App() {
	const [letters, setLetters] = useState<string[]>([
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
	]);
	const [word, setWord] = useState<string>('hello');
	const [usedLetters, setUsedLetters] = useState<string>('');
	const [wrongs, setWrongs] = useState<string[]>([]);
	const [currentLetter, setCurrentLetter] = useState<string>('');

	const checkLetter = (letter: string) => {
		if (word.split('').includes(letter)) {
			console.log('hello');
		} else {
			setWrongs([...wrongs, 'one']);
		}
		setUsedLetters((prev) => prev + letter);
	};

	return (
		<div>
			<h1>
				Wrongs:{' '}
				{wrongs.map((wrong) => (
					<span>{'|'}</span>
				))}
			</h1>
			<h1 style={{ display: 'flex' }}>
				{word.split('').map((word) => (
					<p
						key={word}
						style={usedLetters.includes(word) ? {color: 'black'} : {}}
						className='word'
					>
						{word}
					</p>
				))}
			</h1>
			<h1>{usedLetters}</h1>
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				{letters.map((letter: string) => {
					return (
						<button
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
