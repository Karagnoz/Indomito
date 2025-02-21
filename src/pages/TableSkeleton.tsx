const TableSkeleton = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-slate-300">
            {[...Array(5)].map((_, index) => (
              <th key={index} className="px-2 py-4">
                <div className="w-full h-4 bg-slate-400 animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(5)].map((_, colIndex) => (
                <td key={colIndex} className="px-2 py-4">
                  <div className="w-full h-4 bg-slate-300 animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
