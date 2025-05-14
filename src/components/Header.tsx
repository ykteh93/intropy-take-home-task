import React from 'react';
import { Plus } from 'lucide-react';
import { useLayout } from '../context/LayoutContext';

const Header: React.FC = () => {
  const { addChart } = useLayout();

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <h1 className="text-xl font-medium text-gray-800">Analytics Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={addChart}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            <span>Add Chart</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;