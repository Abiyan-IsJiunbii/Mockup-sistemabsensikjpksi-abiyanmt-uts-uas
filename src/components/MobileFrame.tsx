import { ReactNode } from 'react';

interface MobileFrameProps {
  children: ReactNode;
}

export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center p-4">
      {/* Device Frame */}
      <div className="relative">
        {/* Phone Shadow */}
        <div className="absolute inset-0 bg-black/50 blur-3xl transform translate-y-8" />
        
        {/* Phone Body */}
        <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
          {/* Phone Bezel */}
          <div className="bg-black rounded-[2.5rem] p-2 relative overflow-hidden">
            {/* Top Notch (iPhone style) */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-20 flex items-center justify-center">
              <div className="w-16 h-1.5 bg-gray-800 rounded-full mt-2" />
              <div className="absolute left-4 top-2 w-1.5 h-1.5 bg-gray-700 rounded-full" />
            </div>

            {/* Screen */}
            <div className="bg-white rounded-[2rem] overflow-hidden relative h-[812px] w-[375px]">
              {/* Status Bar Overlay */}
              <div className="absolute top-0 left-0 right-0 h-11 z-20 flex items-center justify-between px-8 pt-2 pointer-events-none">
                <div className="text-xs text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">9:41</div>
                <div className="flex items-center gap-1">
                  {/* Signal */}
                  <svg className="w-4 h-3 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]" viewBox="0 0 16 12" fill="currentColor">
                    <rect x="0" y="8" width="2" height="4" className="text-white" />
                    <rect x="3" y="5" width="2" height="7" className="text-white" />
                    <rect x="6" y="2" width="2" height="10" className="text-white" />
                    <rect x="9" y="0" width="2" height="12" className="text-white" />
                  </svg>
                  {/* WiFi */}
                  <svg className="w-4 h-3 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]" viewBox="0 0 16 12" fill="currentColor">
                    <path d="M8 12C7.4 12 7 11.6 7 11C7 10.4 7.4 10 8 10C8.6 10 9 10.4 9 11C9 11.6 8.6 12 8 12ZM4 8C5.1 8 6.1 8.4 6.8 9.1L8 7.9C6.7 6.6 4.3 6.6 3 7.9L4.2 9.1C4.9 8.4 5.9 8 7 8ZM1 5L2.2 6.2C4.1 4.3 7.9 4.3 9.8 6.2L11 5C8.4 2.4 4.6 2.4 2 5H1Z" className="text-white" />
                  </svg>
                  {/* Battery */}
                  <svg className="w-6 h-3 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]" viewBox="0 0 24 12" fill="currentColor">
                    <rect x="0" y="0" width="20" height="12" rx="2" className="text-white" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="2" y="2" width="16" height="8" rx="1" className="text-white" />
                    <rect x="21" y="4" width="2" height="4" rx="1" className="text-white" />
                  </svg>
                </div>
              </div>

              {/* App Content */}
              <div className="h-full overflow-hidden pt-11">
                {children}
              </div>
            </div>

            {/* Home Indicator (iPhone style) */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-700 rounded-full" />
          </div>

          {/* Volume Buttons */}
          <div className="absolute left-0 top-32 w-1 h-8 bg-gray-800 rounded-l-lg -translate-x-3" />
          <div className="absolute left-0 top-44 w-1 h-8 bg-gray-800 rounded-l-lg -translate-x-3" />
          
          {/* Power Button */}
          <div className="absolute right-0 top-36 w-1 h-12 bg-gray-800 rounded-r-lg translate-x-3" />
        </div>
      </div>
    </div>
  );
}
