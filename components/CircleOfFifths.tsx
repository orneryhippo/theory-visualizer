
import React from 'react';
import { Note } from '../types';

interface CircleOfFifthsProps {
  selectedNote: Note;
  onSelect: (note: Note) => void;
}

const CircleOfFifths: React.FC<CircleOfFifthsProps> = ({ selectedNote, onSelect }) => {
  const circleNotes: Note[] = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];
  const radius = 100;
  const innerRadius = 70;
  const center = 120;

  return (
    <div className="relative w-full aspect-square flex items-center justify-center p-4">
      <svg width="240" height="240" className="drop-shadow-xl">
        {/* Background Circle */}
        <circle cx={center} cy={center} r={radius} className="fill-white stroke-slate-200" strokeWidth="1" />
        <circle cx={center} cy={center} r={innerRadius} className="fill-slate-50 stroke-slate-200" strokeWidth="1" />
        
        {circleNotes.map((note, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x = center + radius * 0.85 * Math.cos(angle);
          const y = center + radius * 0.85 * Math.sin(angle);
          const isSelected = selectedNote === note;

          return (
            <g 
              key={note} 
              className="cursor-pointer group" 
              onClick={() => onSelect(note)}
            >
              <circle
                cx={x}
                cy={y}
                r="18"
                className={`transition-all duration-300 ${
                  isSelected ? 'fill-indigo-600 scale-110' : 'fill-white group-hover:fill-slate-100'
                } stroke-slate-200`}
                strokeWidth="1"
              />
              <text
                x={x}
                y={y}
                dy=".35em"
                textAnchor="middle"
                className={`text-xs font-bold transition-colors ${
                  isSelected ? 'fill-white' : 'fill-slate-700'
                }`}
              >
                {note}
              </text>
            </g>
          );
        })}
        
        <text
          x={center}
          y={center}
          textAnchor="middle"
          className="text-sm font-bold fill-slate-400 uppercase tracking-widest"
        >
          Major
        </text>
      </svg>
    </div>
  );
};

export default CircleOfFifths;
