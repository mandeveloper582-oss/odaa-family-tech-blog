export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">😢</div>
      <div className="text-red-500 text-lg mb-4">{message || 'Something went wrong'}</div>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Try Again
        </button>
      )}
    </div>
  );
}