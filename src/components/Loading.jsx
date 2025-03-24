export default function Loading() {
    return (
      <div className="flex items-center justify-center mt-4">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-2 text-gray-600">Processing...</p>
      </div>
    );
  }
  