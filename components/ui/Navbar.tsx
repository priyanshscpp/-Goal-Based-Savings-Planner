import Link from "next/link";
import { Button } from "./Button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            {/* Syfe Logo SVG Approximation */}
            <svg
              width="80"
              height="28"
              viewBox="0 0 80 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-auto"
            >
             <path
                d="M12.5 14.5C12.5 11.5 15 11.5 16.5 11.5C18 11.5 19.5 12.5 19.5 12.5L20.5 8.5C20.5 8.5 18.5 7.5 16 7.5C12 7.5 8 9.5 8 14.5C8 18.5 11.5 19.5 13.5 20C15.5 20.5 16 21 16 22C16 23.5 14.5 24 12.5 24C10.5 24 8 22.5 8 22.5L6.5 26C6.5 26 9.5 27.5 12.5 27.5C17.5 27.5 20.5 25 20.5 21.5C20.5 17.5 17 16.5 15 16C13 15.5 12.5 15 12.5 14.5Z"
                fill="#0052CC" // Syfe Blue
              />
              <path
                d="M26 8H30.5L34 16.5L37.5 8H42L36 21.5V27H31.5V21.5L26 8Z"
                fill="#0052CC"
              />
              <path
                d="M49 11.5H46V27H50.5V19.5H53.5V16H50.5V12.5C50.5 12 51 11.5 52 11.5H53.5V8H51C48 8 46 9.5 46 11.5V11.5Z"
                fill="#0052CC"
              />
              <path
                d="M62 20H66.5C66.5 18 65.5 16 62.5 16C59.5 16 58.5 18.5 58.5 21C58.5 24 60.5 27.5 64.5 27.5C67 27.5 69 26 69 26L67.5 22.5C67.5 22.5 66.5 23.5 65 23.5C63 23.5 62.5 22.5 62.5 22.5V20ZM62 19V19.5C62 19.5 64.5 19.5 65.5 19.5C66 19.5 66.5 19.5 66.5 19C66.5 18.5 66.5 13.5 62 13.5C58 13.5 54 17 54 21.5C54 25.5 56.5 27.5 58.5 27.5L58 27.5V27.5C54.5 27.5 54 24.5 54 21C54 16.5 57.5 13.5 62 13.5C66.5 13.5 70 16.5 70 19C70 19.5 70 20 70 20H62Z"
                fill="#0052CC"
              />
              {/* Syfe-like simple text paths or custom drawing. Since I can't get exact font, I will use a Text element if SVG supports it well in a constrained environment, or better, just use a placeholder text if paths are hard. But I'll stick to a clean textual representation using standard font in the Next.js Text if this SVG path is too guess-work.
              Actually, let's just use Text for "Syfe" with a font-weight. It's safer.
              */}
            </svg>
            <span className="text-2xl font-black tracking-tighter text-[#1C3E6E]">Syfe</span>
          </Link>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="#" className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600">
            Portfolios
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600">
            Cash Management
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600">
            Brokerage
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600">
            Learn
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
           {/* Notification Bell */}
           <button className="text-gray-500 hover:text-blue-600 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
           </button>
           
           {/* Profile */}
           <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs ring-2 ring-blue-50 cursor-pointer">
              PY
           </div>
        </div>
      </div>
    </nav>
  );
}
