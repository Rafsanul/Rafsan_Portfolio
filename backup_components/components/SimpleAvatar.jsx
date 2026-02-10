export default function SimpleAvatar() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="relative">
        {/* Outer glow */}
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-20 blur-xl"></div>
        
        {/* Avatar circle */}
        <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-gray-800">
          {/* Your photo will go here - for now using placeholder */}
          <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">UD</span>
          </div>
        </div>
      </div>
    </div>
  );
}