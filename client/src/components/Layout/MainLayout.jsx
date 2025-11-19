// src/components/Layout/MainLayout.jsx
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const MainLayout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <main className={`relative min-h-screen w-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} ${theme === 'dark' ? 'text-white' : 'text-black'} font-sans`}>
      <div className={`absolute inset-0 bg-[linear-gradient(to_right,${theme === 'dark' ? '#ffffff1a' : '#4f4f4f2e'}_1px,transparent_1px),linear-gradient(to_bottom,${theme === 'dark' ? '#ffffff1a' : '#4f4f4f2e'}_1px,transparent_1px)] bg-[size:14px_24px] z-0 pointer-events-none`} />
      <div className="relative z-10">
        {children}
      </div>
    </main>
  );
};

export default MainLayout;
