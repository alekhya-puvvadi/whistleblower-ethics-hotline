export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-8"></div></td>
      <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-48"></div></td>
      <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
      <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
      <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
      <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
      <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
    </tr>
  );
}

export function SkeletonDetail() {
  return (
    <div className="animate-pulse">
      <div className="bg-white rounded-xl shadow p-6 mb-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}