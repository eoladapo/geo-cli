import React, { useEffect, useState } from 'react';
import CodeEditor from './Code-Editor';
import Preview from './Preview';
import bundle from '../bundler/index';
import ReSizeable from './Resizeable';
import { Cell } from '../redux/cell';
import { useActions } from '../hooks/use-actions';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <ReSizeable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <ReSizeable direction="horizontal">
          <CodeEditor initialValue={cell.content} onChange={(value) => updateCell(cell.id, value)} />
        </ReSizeable>
        <Preview code={code} err={err} />
      </div>
    </ReSizeable>
  );
};

export default CodeCell;
