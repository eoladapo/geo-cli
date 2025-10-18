import { useState } from 'react';
import CodeEditor from './Code-Editor';
import Preview from './Preview';
import bundle from '../bundler/index';
import ReSizeable from './Resizeable';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  async function onClick() {
    // for transform + bundle
    const output = await bundle(input);
    setCode(output);
  }

  return (
    <ReSizeable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <ReSizeable direction="horizontal">
          <CodeEditor initialValue="const a = 1;" onChange={(value) => setInput(value)} />
        </ReSizeable>
        {/* <div>
          <button onClick={onClick}>Submit</button>
        </div> */}
        <Preview code={code} />
      </div>
    </ReSizeable>
  );
};

export default CodeCell;
