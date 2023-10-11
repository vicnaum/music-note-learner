// components/NoteButtons.tsx

import React from 'react';

interface NoteButtonsProps {
	onGuess: (note: string) => void;
	userGuess: string | null;
	isCorrect: boolean | null;
}

const NOTES = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];

const NoteButtons: React.FC<NoteButtonsProps> = ({
	onGuess,
	userGuess,
	isCorrect,
}) => {
	return (
		<div className="buttons-row">
			{NOTES.map((note) => (
				<button
					key={note}
					onClick={() => onGuess(note)}
					style={{
						backgroundColor:
							userGuess === note ? (isCorrect ? 'green' : 'red') : 'white',
					}}
				>
					{note.toUpperCase()}
				</button>
			))}
		</div>
	);
};

export default NoteButtons;
