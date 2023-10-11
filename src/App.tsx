import React, { useState, useEffect } from 'react';
import './App.css';
import MusicNoteDisplay from './components/MusicNoteDisplay';
import NoteButtons from './components/NoteButtons';
import Feedback from './components/Feedback';
import ScoreDisplay from './components/ScoreDisplay';

const NOTES = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const OCTAVE = '/4'; // for simplicity, we'll use the 4th octave. This can be randomized later if needed.

function App() {
	const [currentNote, setCurrentNote] = useState<string>('c/4');
	const [userGuess, setUserGuess] = useState<string | null>(null);
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

	const [round, setRound] = useState<number>(1);
	const [correctGuesses, setCorrectGuesses] = useState<number>(0);
	const [incorrectGuesses, setIncorrectGuesses] = useState<number>(0);

	useEffect(() => {
		const randomNote = NOTES[Math.floor(Math.random() * NOTES.length)] + OCTAVE;
		setCurrentNote(randomNote);
	}, []);

	const handleNoteGuess = (guess: string) => {
		const isGuessCorrect = guess + OCTAVE === currentNote;
		setUserGuess(guess);
		setIsCorrect(isGuessCorrect);

		// This timeout is for the button fade and transition between rounds.
		setTimeout(() => {
			if (isGuessCorrect) {
				setCorrectGuesses((prev) => prev + 1);
			} else {
				setIncorrectGuesses((prev) => prev + 1);
			}

			if (round < 10) {
				const randomNote =
					NOTES[Math.floor(Math.random() * NOTES.length)] + OCTAVE;
				setCurrentNote(randomNote);
				setUserGuess(null);
				setIsCorrect(null);
				setRound((prev) => prev + 1);
			}
		}, 1000);
	};

	return (
		<div className="App">
			<ScoreDisplay correct={correctGuesses} incorrect={incorrectGuesses} />

			<MusicNoteDisplay note={currentNote} clef="treble" />

			<NoteButtons
				onGuess={handleNoteGuess}
				userGuess={userGuess}
				isCorrect={isCorrect}
			/>

			<Feedback isCorrect={isCorrect} currentNote={currentNote} />
		</div>
	);
}

export default App;
