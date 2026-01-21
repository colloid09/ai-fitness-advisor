export default function LoadingScreen({ text }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        
        {/* Spinner */}
        <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />

        {/* Text */}
        <p className="text-lg font-medium text-gray-700 text-center">
          {text || "Loading..."}
        </p>
      </div>
    </div>
  );
}
