
export type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';

export interface ScaleData {
  root: Note;
  type: string;
  notes: Note[];
  intervals: string[];
}

export interface ChordData {
  root: Note;
  type: string;
  notes: Note[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type ImageSize = '1K' | '2K' | '4K';
