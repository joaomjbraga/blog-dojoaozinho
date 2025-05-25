'use client';
import React from 'react';

interface MacOSWindowProps {
  children: React.ReactNode;
  language?: string;
}

const MacOSWindow: React.FC<MacOSWindowProps> = ({ children, language }) => {
  return (
    <div className="mac-window rounded-lg overflow-hidden border border-border/50 shadow-md mb-4">
      <div className="mac-window-header bg-muted/80 dark:bg-muted/40 px-4 py-2 flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-destructive" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-primary" />
        </div>
        {language && (
          <div className="ml-4 text-xs text-muted-foreground font-mono">
            {language}
          </div>
        )}
      </div>
      <div className="mac-window-content bg-card dark:bg-muted/20 p-4 overflow-x-auto">
        {children}
      </div>
    </div>
  );
};

export default MacOSWindow;