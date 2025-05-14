import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Layout } from 'react-grid-layout';
import { ChartData, ChartDataEntry, LayoutContextType } from '../utils/types';

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

const generateDefaultLayout = (): Layout[] => {
  return [
    { i: 'chart-1', x: 0, y: 0, w: 6, h: 3, minW: 3, minH: 2 },
    { i: 'chart-2', x: 6, y: 0, w: 6, h: 3, minW: 3, minH: 2 },
    { i: 'chart-3', x: 0, y: 3, w: 4, h: 3, minW: 3, minH: 2 },
    { i: 'chart-4', x: 4, y: 3, w: 8, h: 3, minW: 3, minH: 2 },
  ];
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [layouts, setLayouts] = useState<Layout[]>(() => {
    try {
      const savedLayouts = localStorage.getItem('dashboard-layouts');
      return savedLayouts ? JSON.parse(savedLayouts) : generateDefaultLayout();
    } catch (error) {
      console.error('Error loading layouts:', error);
      return generateDefaultLayout();
    }
  });

  const [chartData, setChartData] = useState<ChartData>(() => {
    try {
      const savedChartData = localStorage.getItem('dashboard-chartData');
      return savedChartData ? JSON.parse(savedChartData) : {};
    } catch (error) {
      console.error('Error loading chart data:', error);
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('dashboard-layouts', JSON.stringify(layouts));
  }, [layouts]);

  useEffect(() => {
    localStorage.setItem('dashboard-chartData', JSON.stringify(chartData));
  }, [chartData]);

  const updateLayouts = (newLayouts: Layout[]) => {
    setLayouts(newLayouts);
  };

  const updateChartData = (id: string, data: ChartDataEntry) => {
    setChartData((prev) => ({
      ...prev,
      [id]: data,
    }));
  };

  const addChart = () => {
    const id = `chart-${Date.now()}`;
    const newChart = {
      i: id,
      x: 0,
      y: 0,
      w: 6,
      h: 3,
      minW: 3,
      minH: 2,
    };

    setLayouts((prev) => [...prev, newChart]);
  };

  const removeChart = (id: string) => {
    setLayouts((prev) => prev.filter((layout) => layout.i !== id));

    setChartData((prev) => {
      const newData = { ...prev };
      delete newData[id];
      return newData;
    });
  };

  return (
    <LayoutContext.Provider
      value={{
        layouts,
        chartData,
        updateLayouts,
        updateChartData,
        addChart,
        removeChart,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
