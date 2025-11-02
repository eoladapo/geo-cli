import React, { useEffect } from 'react';
import CodeEditor from './Code-Editor';
import Preview from './Preview';
import ReSizeable from './Resizeable';
import { Cell } from '../redux/cell';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content, cell.id]);

  return (
    <ReSizeable direction="vertical">
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <ReSizeable direction="horizontal">
          <CodeEditor initialValue={cell.content} onChange={(value) => updateCell(cell.id, value)} />
        </ReSizeable>
        {bundle && <Preview code={bundle.code} err={bundle.err} />}
      </div>
    </ReSizeable>
  );
};

export default CodeCell;
