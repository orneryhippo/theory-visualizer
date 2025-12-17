
import React, { useState } from 'react';
import { generateMusicImage, checkApiKeySelection, openApiKeySelection } from '../services/geminiService';
import { ImageSize } from '../types';

const VisualGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>('1K');
  const [image, setImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);

    try {
      const isKeySelected = await checkApiKeySelection();
      if (!isKeySelected) {
        await openApiKeySelection();
        // After opening key selection, we proceed assuming user will select it.
      }

      const imageUrl = await generateMusicImage(prompt, size);
      if (imageUrl) {
        setImage(imageUrl);
      } else {
        setError('Failed to generate image.');
      }
    } catch (err: any) {
      if (err.message?.includes("Requested entity was not found")) {
        setError("API Key error. Please select a valid key from a paid GCP project.");
        await openApiKeySelection();
      } else {
        setError("Something went wrong during generation.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-semibold text-slate-600 block">Artistic Concept</label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. C Major scale as an abstract watercolor landscape"
            className="w-full bg-slate-100 rounded-lg px-4 py-2 text-sm border border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none"
          />
        </div>
        <div className="w-full md:w-32 space-y-2">
          <label className="text-sm font-semibold text-slate-600 block">Quality</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as ImageSize)}
            className="w-full bg-slate-100 rounded-lg px-3 py-2 text-sm border border-transparent focus:border-indigo-500 transition-all outline-none"
          >
            <option value="1K">1K Res</option>
            <option value="2K">2K High</option>
            <option value="4K">4K Ultra</option>
          </select>
        </div>
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full md:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all disabled:opacity-50 whitespace-nowrap"
        >
          {isGenerating ? 'Envisioning...' : 'Generate Visual'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100 flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => openApiKeySelection()} className="underline text-xs font-bold">Manage Keys</button>
        </div>
      )}

      <div className="relative aspect-video bg-slate-50 rounded-xl overflow-hidden border-2 border-dashed border-slate-200 flex items-center justify-center group">
        {image ? (
          <>
            <img src={image} alt="Generated music theory visual" className="w-full h-full object-contain" />
            <a 
              href={image} 
              download="music-visual.png"
              className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </>
        ) : (
          <div className="text-center space-y-2 p-8">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-slate-500 font-medium">Your artistic music visual will appear here</h3>
            <p className="text-slate-400 text-xs max-w-xs mx-auto">Requires a selected Gemini Pro API key with billing enabled. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline hover:text-indigo-500">Learn more</a></p>
          </div>
        )}

        {isGenerating && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-indigo-600 space-y-4">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="font-bold text-sm animate-pulse">Consulting the Muses...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualGenerator;
