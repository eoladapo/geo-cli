import { useState } from 'react';
import CodeEditor from './Code-Editor';
import Preview from './Preview';
import bundle from '../bundler/index';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  async function onClick() {
    // for transform + bundle
    const output = await bundle(input);
    setCode(output);
  }

  return (
    <div>
      <CodeEditor initialValue="const a = 1;" onChange={(value) => setInput(value)} />
      <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
