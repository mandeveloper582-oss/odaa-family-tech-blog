export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🌳</span>
        </div>
      </div>
    </div>
  );
}