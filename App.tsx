
import React, { useState, useMemo } from 'react';
import { Note, ScaleData, ChordData } from './types';
import { NOTES, SCALE_TYPES, CHORD_TYPES, getNotesForScale, getNotesForChord } from './constants';
import Piano from './components/Piano';
import CircleOfFifths from './components/CircleOfFifths';
import TheoryChat from './components/TheoryChat';
import VisualGenerator from './components/VisualGenerator';

const App: React.FC = () => {
  const [root, setRoot] = useState<Note>('C');
  const [scaleType, setScaleType] = useState<keyof typeof SCALE_TYPES>('Major');
  const [chordType, setChordType] = useState<keyof typeof CHORD_TYPES>('Major');
  const [activeTab, setActiveTab] = useState<'scale' | 'chord'>('scale');

  const activeNotes = useMemo(() => {
    return activeTab === 'scale' 
      ? getNotesForScale(root, scaleType) 
      : getNotesForChord(root, chordType);
  }, [root, scaleType, chordType, activeTab]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Sidebar - Theory Chat */}
      <aside className="w-full lg:w-80 h-[500px] lg:h-screen sticky top-0 bg-white border-r border-slate-200 z-20 flex flex-col p-4">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-indigo-600 bg-clip-text text-transparent">Harmonia</h1>
        </div>
        <div className="flex-1 overflow-hidden">
          <TheoryChat />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-8 space-y-8 bg-slate-50 overflow-y-auto">
        {/* Header Visualizer Section */}
        <section className="bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <svg className="w-64 h-64 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 relative z-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Theory Visualizer</h2>
              <p className="text-slate-500">Explore intervals and harmonies with interactive tools.</p>
            </div>
            
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('scale')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'scale' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Scales
              </button>
              <button
                onClick={() => setActiveTab('chord')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'chord' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Chords
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visuals */}
            <div className="space-y-8">
              <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl">
                <Piano highlightedNotes={activeNotes} />
                <div className="mt-6 flex flex-wrap gap-2">
                  {activeNotes.map((note, i) => (
                    <span key={i} className="bg-slate-800 text-indigo-400 px-3 py-1 rounded-full text-sm font-mono border border-slate-700">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-indigo-600 font-bold text-xl shadow-sm">
                  {root}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    {root} {activeTab === 'scale' ? scaleType : chordType}
                  </h4>
                  <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider">
                    {activeTab === 'scale' ? 'Mode / Scale' : 'Harmonic Structure'}
                  </p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Root Note</label>
                  <select
                    value={root}
                    onChange={(e) => setRoot(e.target.value as Note)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                  >
                    {NOTES.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Variation</label>
                  {activeTab === 'scale' ? (
                    <select
                      value={scaleType}
                      onChange={(e) => setScaleType(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                    >
                      {Object.keys(SCALE_TYPES).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  ) : (
                    <select
                      value={chordType}
                      onChange={(e) => setChordType(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                    >
                      {Object.keys(CHORD_TYPES).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  )}
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-1 text-center">Circle of Fifths Reference</p>
                <CircleOfFifths selectedNote={root} onSelect={setRoot} />
              </div>
            </div>
          </div>
        </section>

        {/* Artistic Generation Section */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">Artistic Inspiration</h2>
          </div>
          <VisualGenerator />
        </section>
        
        <footer className="text-center py-8 border-t border-slate-200 mt-12">
          <p className="text-slate-400 text-sm">Harmonia Studio &bull; Powered by Gemini AI</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
