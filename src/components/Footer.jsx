import { FiHeart } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border border-cyan-500 flex items-center justify-center">
                <span className="text-cyan-400 font-bold text-xs">UD</span>
              </div>
              <span className="text-white font-mono font-bold">
                RAFSAN<span className="text-cyan-400">UL</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              Frontend Developer & CSE Graduate
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-500 text-sm flex items-center justify-center md:justify-end gap-1">
              Made with <FiHeart className="text-red-500" /> using React & Tailwind
            </p>
            <p className="text-gray-600 text-xs mt-2">
              © {new Date().getFullYear()} Rafsanul Islam Udoy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}