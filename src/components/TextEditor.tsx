import MDEditor from '@uiw/react-md-editor';
import React, { useEffect, useRef, useState } from 'react';
import './text-editor.css';

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState<string>('**Hello world!!!**');

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && ref.current.contains(event.target as Node)) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor value={value} onChange={(v) => setValue(v || '')} />
      </div>
    );
  }
  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
