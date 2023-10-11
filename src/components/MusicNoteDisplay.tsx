import React, { useEffect, useRef } from 'react';
import { Renderer, Stave, Voice, Formatter, StaveNote } from 'vexflow';

interface MusicNoteDisplayProps {
	note: string;
	clef: 'treble' | 'bass';
}

const MusicNoteDisplay: React.FC<MusicNoteDisplayProps> = ({ note, clef }) => {
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (divRef.current) {
			divRef.current.innerHTML = '';

			const renderer = new Renderer(divRef.current, Renderer.Backends.SVG);

			const width = divRef.current.clientWidth;
			const height = divRef.current.clientHeight;

			renderer.resize(width, height);
			const context = renderer.getContext();

			const scale = width / 250;
			context.scale(scale, scale);

			const staveWidth = width / scale;
			const stave = new Stave(0, (height * 0.15) / scale, staveWidth);
			stave.addClef(clef).addTimeSignature('4/4');
			stave.setContext(context).draw();

			const notes = [new StaveNote({ keys: [note], duration: 'q', clef })];

			const voice = new Voice({ num_beats: 4, beat_value: 4 });
			voice.setStrict(false);
			voice.addTickables(notes);

			new Formatter().joinVoices([voice]).format([voice], staveWidth);

			const xOffset = (staveWidth - notes[0].getBoundingBox().getW()) / 3;
			voice.getTickables().forEach((n) => {
				n.setXShift(xOffset);
			});

			voice.draw(context, stave);
		}
	}, [divRef, note, clef]);

	return <div ref={divRef} className="music-sheet"></div>;
};

export default MusicNoteDisplay;
