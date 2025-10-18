import React from 'react';
import { ResizableBox } from 'react-resizable';
import './resizeable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

const ReSizeable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox
      height={300}
      width={Infinity}
      maxConstraints={[Infinity, window.innerHeight * 0.9]}
      minConstraints={[Infinity, 24]}
      resizeHandles={['s']}
    >
      {children}
    </ResizableBox>
  );
};

export default ReSizeable;
