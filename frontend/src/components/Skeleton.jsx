const Skeleton = ({ type = 'card', count = 1 }) => {
  const skeletons = [];

  for (let i = 0; i < count; i++) {
    if (type === 'card') {
      skeletons.push(
        <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-slate-200 rounded-lg"></div>
            <div className="w-16 h-4 bg-slate-200 rounded"></div>
          </div>
          <div className="h-8 bg-slate-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        </div>
      );
    } else if (type === 'table') {
      skeletons.push(
        <div key={i} className="space-y-3">
          <div className="h-10 bg-slate-200 rounded w-full animate-pulse"></div>
          <div className="h-16 bg-slate-200 rounded w-full animate-pulse"></div>
          <div className="h-16 bg-slate-200 rounded w-full animate-pulse"></div>
          <div className="h-16 bg-slate-200 rounded w-full animate-pulse"></div>
        </div>
      );
    } else if (type === 'chart') {
      skeletons.push(
        <div key={i} className="h-64 bg-slate-200 rounded-xl animate-pulse"></div>
      );
    }
  }

  return <>{skeletons}</>;
};

export default Skeleton;