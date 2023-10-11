type Props = {
	correct: number;
	incorrect: number;
};

const ScoreDisplay: React.FC<Props> = ({ correct, incorrect }) => (
	<div className="score-display">
		<span className="correct">{correct}</span>/
		<span className="incorrect">{incorrect}</span>
	</div>
);

export default ScoreDisplay;
