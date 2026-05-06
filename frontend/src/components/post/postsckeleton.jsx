export default function PostSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="bg-gray-200 dark:bg-gray-700 h-48"></div>
      <div className="p-5">
        <div className="bg-gray-200 dark:bg-gray-700 h-6 w-20 rounded mb-3"></div>
        <div className="bg-gray-200 dark:bg-gray-700 h-6 w-full rounded mb-2"></div>
        <div className="bg-gray-200 dark:bg-gray-700 h-6 w-3/4 rounded mb-2"></div>
        <div className="bg-gray-200 dark:bg-gray-700 h-4 w-full rounded mb-1"></div>
        <div className="bg-gray-200 dark:bg-gray-700 h-4 w-5/6 rounded mb-4"></div>
        <div className="flex justify-between">
          <div className="bg-gray-200 dark:bg-gray-700 h-5 w-24 rounded"></div>
          <div className="bg-gray-200 dark:bg-gray-700 h-5 w-16 rounded"></div>
        </div>
      </div>
    </div>
  );
}