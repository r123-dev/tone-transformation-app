import React, { useState, useRef } from 'react';
import './App.css';

const App = () => {
  const [text, setText] = useState('');
  const [tone, setTone] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const undoStack = useRef([]);
  const redoStack = useRef([]);

  const handleToneChange = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError('');

   
    undoStack.current.push(text);
    redoStack.current = []; 

    try {
      const res = await fetch('http://localhost:4000/api/adjust-tone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, toneLevel: tone }),
      });

      if (!res.ok) throw new Error('Failed to fetch response');

      const data = await res.json();

   
      console.log('Response from server:', data);

      
      if (data.text) {
        setText(data.text); 
      } else {
        setError('Invalid response structure from server.');
      }
    } catch (err) {
      setError('Tone transformation failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUndo = () => {
    if (undoStack.current.length === 0) return;
    const last = undoStack.current.pop();
    redoStack.current.push(text);
    setText(last);
  };

  const handleRedo = () => {
    if (redoStack.current.length === 0) return;
    const next = redoStack.current.pop();
    undoStack.current.push(text);
    setText(next);
  };

  const handleReset = () => {
    undoStack.current.push(text);
    redoStack.current = [];
    setText('');
    setTone(5);
  };

  return (
    <div className="app-container">
      <div className="editor">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
        />
      </div>

      <div className="controls">
        <div className="slider-container">
          <label>
            Tone Level: <strong>{tone}</strong>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={tone}
            onChange={(e) => setTone(Number(e.target.value))}
          />
        </div>

        <button onClick={handleToneChange} disabled={loading}>
          {loading ? 'Transforming...' : 'Transform Tone'}
        </button>

        <div className="history-buttons">
          <button onClick={handleUndo} disabled={undoStack.current.length === 0}>
            Undo
          </button>
          <button onClick={handleRedo} disabled={redoStack.current.length === 0}>
            Redo
          </button>
        </div>

        <button onClick={handleReset}>Reset</button>

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default App;
