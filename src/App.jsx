import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import LoadingScreen from "./components/LoadingScreen.jsx";
import ThemeToggle from "./components/ThemeToggle";
import VisitorCounter from "./components/VisitorCounter";
import PixelCursor from "./components/PixelCursor"; // Add this import
import { Suspense, lazy } from "react";

// Lazy load only the PixelGame component
const PixelGame = lazy(() => import("./components/PixelGame"));

// Simple loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-cyan-400 animate-pulse font-mono">Loading...</div>
  </div>
);

// Hidden Easter Egg Page
function HiddenEasterEgg() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400">
          🥚 EASTER EGG FOUND!
        </h1>
        <p className="text-2xl text-gray-300 mb-8">
          You discovered my secret page!
        </p>
        <div className="max-w-md mx-auto bg-gray-900/50 p-8 rounded-xl border border-green-500/50">
          <p className="text-gray-400 mb-4">
            Congratulations! You found the hidden page by entering the Konami code.
          </p>
          <p className="text-green-300 font-mono">
            Up Up Down Down Left Right Left Right B A
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black flex flex-col">
        <LoadingScreen />
        <PixelCursor /> {/* Add PixelCursor here */}
        <Navbar />
        <ThemeToggle />
        <VisitorCounter />
        <main className="flex-grow">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
              {/* Keep only Pixel Game */}
              <Route path="/pixel-game" element={<PixelGame />} />
              <Route path="/hidden" element={<HiddenEasterEgg />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;