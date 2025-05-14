import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { MoreHorizontal, Maximize2, MessageSquare, X } from 'lucide-react';
import { useLayout } from '../context/LayoutContext';
import { useMockAI } from '../hooks/useMockAI';
import ChartTypeSelector from './ChartTypeSelector';

interface ChartWidgetProps {
  id: string;
}

const ChartWidget: React.FC<ChartWidgetProps> = ({ id }) => {
  const { removeChart, chartData, updateChartData } = useLayout();
  const { generateChartFromPrompt, isLoading } = useMockAI();
  const [showMenu, setShowMenu] = useState(false);
  const [showAIInput, setShowAIInput] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [chartType, setChartType] = useState(chartData[id]?.chartType || 'line');

  const data = chartData[id] || {
    title: 'Untitled Chart',
    chartType: 'line',
    options: {
      chart: {
        type: 'line',
        style: {
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
        }
      },
      title: {
        text: 'Untitled Chart'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      },
      yAxis: {
        title: {
          text: 'Values'
        }
      },
      series: [{
        name: 'Series 1',
        data: [29, 71, 106, 129, 144, 176]
      }]
    }
  };

  const handleAISubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    
    const newChartOptions = await generateChartFromPrompt(aiPrompt);
    updateChartData(id, {
      ...data,
      title: newChartOptions.title.text,
      options: newChartOptions
    });
    
    setAiPrompt('');
    setShowAIInput(false);
  };

  const handleChartTypeChange = (type: string) => {
    setChartType(type);
    
    const updatedOptions = {
      ...data.options,
      chart: {
        ...data.options.chart,
        type
      }
    };
    
    updateChartData(id, {
      ...data,
      chartType: type,
      options: updatedOptions
    });
  };

  const toggleMenu = () => setShowMenu(!showMenu);
  const toggleAIInput = () => setShowAIInput(!showAIInput);

  return (
    <div className="flex flex-col h-full">
      <div className="chart-drag-handle flex items-center justify-between p-3 border-b border-gray-100">
        <h3 className="font-medium text-gray-800 text-sm truncate flex-1">{data.title}</h3>
        <div className="flex items-center gap-2 relative">
          <button
            onClick={toggleAIInput}
            className="text-gray-500 hover:text-blue-600 transition-colors p-1 rounded"
            title="Ask AI"
          >
            <MessageSquare size={16} />
          </button>
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-blue-600 transition-colors p-1 rounded"
          >
            <MoreHorizontal size={16} />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-md border border-gray-200 p-1 z-10 min-w-40">
              <ChartTypeSelector currentType={chartType} onSelect={handleChartTypeChange} />
              <button
                onClick={() => {
                  setShowMenu(false);
                  removeChart(id);
                }}
                className="flex items-center gap-2 w-full text-left p-2 text-sm text-red-600 hover:bg-red-50 rounded"
              >
                <X size={14} />
                <span>Remove Chart</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-1 relative overflow-hidden">
        {showAIInput && (
          <div className="absolute inset-0 bg-white z-10 flex flex-col p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-800">Ask AI to generate a chart</h4>
              <button
                onClick={toggleAIInput}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleAISubmit} className="flex-1 flex flex-col">
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="E.g., Show me monthly revenue for the past 6 months"
                className="flex-1 p-3 border border-gray-200 rounded-md text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                autoFocus
              />
              <button
                type="submit"
                disabled={isLoading || !aiPrompt.trim()}
                className={`mt-3 p-2 rounded-md text-white font-medium text-sm ${
                  isLoading || !aiPrompt.trim() ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? 'Generating...' : 'Generate Chart'}
              </button>
            </form>
          </div>
        )}
        
        <HighchartsReact
          highcharts={Highcharts}
          options={data.options}
          containerProps={{ style: { height: '100%', width: '100%' } }}
        />
      </div>
    </div>
  );
};

export default ChartWidget;