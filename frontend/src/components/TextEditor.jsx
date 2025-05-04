import React from 'react';

export default function TextEditor({ text, setText }) {
  return (
    <textarea
      className="text-editor"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Enter text here..."
    />
  );
}