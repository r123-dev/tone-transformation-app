import React from 'react';

export default function Controls({ undo, redo, reset, canUndo, canRedo }) {
  return (
    <div className="controls">
      <button onClick={undo} disabled={!canUndo}>Undo</button>
      <button onClick={redo} disabled={!canRedo}>Redo</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}