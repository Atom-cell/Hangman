import React, { useState } from 'react';
import './App.css';
import Gallow from './Gallow';

function App() {
	const letters= [
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
	]
	const [word, setWord] = useState<string>('hello');
	const [usedLetters, setUsedLetters] = useState<string[]>([]);
	const [lives, setLives] = useState<number[]>([]);
 
	const checkLetter = (letter: string) => {
		setUsedLetters([...usedLetters, letter]);
		if (word.split('').includes(letter)) {
		} else {
			setLives([...lives, 1]);
			if (lives.length +1 ===6) {
				setUsedLetters([...letters]);
			}
		}
	};

	const reset = () :void => {

	};

	return (
		<div>
			<Gallow lives={lives}/>
			<h1 style={{ display: 'flex' }}>
				{word.split('').map((word) => (
					<p
						key={word}
						style={usedLetters.includes(word) ? { color: 'black' } : {}}
						className='word'
					>
						{word}
					</p>
				))}
			</h1>
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
