
import React from 'react';
import { Note } from '../types';
import { NOTES } from '../constants';

interface PianoProps {
  highlightedNotes: Note[];
}

const Piano: React.FC<PianoProps> = ({ highlightedNotes }) => {
  const keys = [
    { note: 'C', isBlack: false }, { note: 'C#', isBlack: true },
    { note: 'D', isBlack: false }, { note: 'D#', isBlack: true },
    { note: 'E', isBlack: false },
    { note: 'F', isBlack: false }, { note: 'F#', isBlack: true },
    { note: 'G', isBlack: false }, { note: 'G#', isBlack: true },
    { note: 'A', isBlack: false }, { note: 'A#', isBlack: true },
    { note: 'B', isBlack: false },
    { note: 'C', isBlack: false, octave: 1 }, { note: 'C#', isBlack: true, octave: 1 },
    { note: 'D', isBlack: false, octave: 1 }, { note: 'D#', isBlack: true, octave: 1 },
    { note: 'E', isBlack: false, octave: 1 }
  ];

  return (
    <div className="flex relative h-48 w-full bg-slate-900 p-2 rounded-xl shadow-inner overflow-x-auto select-none">
      {keys.map((key, i) => {
        const isHighlighted = highlightedNotes.includes(key.note as Note);
        if (key.isBlack) {
          return (
            <div
              key={`${key.note}-${i}`}
              className={`absolute h-28 w-6 z-10 rounded-b-md transition-colors duration-200 cursor-pointer ${
                isHighlighted ? 'bg-indigo-500 shadow-indigo-400/50 shadow-lg' : 'bg-slate-800'
              }`}
              style={{ left: `${(i * 24) + 12}px` }}
            >
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-bold uppercase">
                {key.note}
              </span>
            </div>
          );
        }
        return (
          <div
            key={`${key.note}-${i}`}
            className={`min-w-[40px] h-full rounded-b-lg border-x border-slate-200 flex items-end justify-center pb-2 transition-colors duration-200 cursor-pointer ${
              isHighlighted ? 'bg-indigo-100' : 'bg-white'
            }`}
          >
            <span className={`text-xs font-bold ${isHighlighted ? 'text-indigo-600' : 'text-slate-400'}`}>
              {key.note}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Piano;
