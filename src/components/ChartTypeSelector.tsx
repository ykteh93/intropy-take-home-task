import React from 'react';
import { BarChart3, LineChart, PieChart } from 'lucide-react';

interface ChartTypeSelectorProps {
  currentType: string;
  onSelect: (type: string) => void;
}

const ChartTypeSelector: React.FC<ChartTypeSelectorProps> = ({ currentType, onSelect }) => {
  const chartTypes = [
    { type: 'line', label: 'Line', icon: <LineChart size={14} /> },
    { type: 'column', label: 'Column', icon: <BarChart3 size={14} /> },
    { type: 'bar', label: 'Bar', icon: <BarChart3 className="rotate-90" size={14} /> },
    { type: 'pie', label: 'Pie', icon: <PieChart size={14} /> },
    { type: 'area', label: 'Area', icon: <LineChart size={14} /> },
  ];

  return (
    <div className="p-1">
      {chartTypes.map((chart) => (
        <button
          key={chart.type}
          onClick={() => onSelect(chart.type)}
          className={`flex items-center gap-2 w-full text-left p-2 text-sm rounded ${
            currentType === chart.type
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          {chart.icon}
          <span>{chart.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ChartTypeSelector;