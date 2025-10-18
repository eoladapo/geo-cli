import React, { useEffect } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizeable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

const ReSizeable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight] = React.useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = React.useState(window.innerWidth);
  const [width, setWidth] = React.useState(window.innerWidth * 0.5);

  let resizableProps: ResizableBoxProps;

  useEffect(() => {
    let timer = any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 1000);
    };
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  if (direction === 'horizontal') {
    resizableProps = {
      height: Infinity,
      width,
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      resizeHandles: ['e'],
      className: 'resize-horizontal',
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 24],
      resizeHandles: ['s'],
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default ReSizeable;
