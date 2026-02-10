export default function TestTailwind() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Tailwind Test</h1>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-purple-600 rounded-lg">Purple Box</div>
        <div className="p-4 bg-blue-600 rounded-lg">Blue Box</div>
        <div className="p-4 bg-green-600 rounded-lg">Green Box</div>
      </div>
      
      <p className="text-gray-400">If you see colored boxes and black background, Tailwind works!</p>
      <p className="text-red-400 mt-4">If background is white and text is black, Tailwind is NOT working</p>
    </div>
  );
}