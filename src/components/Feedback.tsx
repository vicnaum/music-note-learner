import React from 'react';

interface FeedbackProps {
	isCorrect: boolean | null;
	currentNote: string;
}

const Feedback: React.FC<FeedbackProps> = ({ isCorrect, currentNote }) => {
	let feedbackText: string;

	if (isCorrect === null) {
		feedbackText = ' ';
	} else if (isCorrect) {
		feedbackText = 'Correct!';
	} else {
		feedbackText = `Incorrect... it's a ${currentNote[0].toUpperCase()}`;
	}

	return <div className="feedback">{feedbackText}</div>;
};

export default Feedback;
