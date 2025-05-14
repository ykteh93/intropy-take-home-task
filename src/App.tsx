import React from 'react';
import Dashboard from './components/Dashboard';
import { LayoutProvider } from './context/LayoutContext';
import Header from './components/Header';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <LayoutProvider>
        <Header />
        <main className="flex-1 p-4 md:p-6">
          <Dashboard />
        </main>
      </LayoutProvider>
    </div>
  );
}

export default App;