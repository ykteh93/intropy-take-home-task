import React, { useState } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-grid-layout/css/styles.css';
import ChartWidget from './ChartWidget';
import { useLayout } from '../context/LayoutContext';

const ReactGridLayout = WidthProvider(RGL);

const Dashboard: React.FC = () => {
  const { layouts, updateLayouts } = useLayout();
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      className={`transition-opacity duration-200 ${
        isResizing || isDragging ? 'opacity-90' : 'opacity-100'
      }`}
    >
      <ReactGridLayout
        className="layout"
        layout={layouts}
        cols={12}
        rowHeight={100}
        onLayoutChange={(updatedLayouts) => updateLayouts(updatedLayouts)}
        onResizeStart={() => setIsResizing(true)}
        onResizeStop={() => setIsResizing(false)}
        onDragStart={() => setIsDragging(true)}
        onDragStop={() => setIsDragging(false)}
        draggableHandle=".chart-drag-handle"
        resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        compactType="vertical"
        useCSSTransforms={true}
        verticalCompact={true}
        isBounded={true}
      >
        {layouts.map((layout) => (
          <div
            key={layout.i}
            className="rounded-lg overflow-hidden shadow-sm border border-gray-200 bg-white"
          >
            <ChartWidget id={layout.i} />
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export default Dashboard;
