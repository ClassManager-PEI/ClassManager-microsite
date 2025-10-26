export default function TeamMember({task, isLeft, startLine}) {
    
    const parseDate = (dateStr) => {
        return new Date(dateStr);
    };
    
    const formatDate = (dateStr) => {
        const date = parseDate(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };
    
    const formatDateShort = (dateStr) => {
        const date = parseDate(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const start = formatDateShort(task.date)
    const end = formatDateShort(task.endDate)
    const diff = Math.ceil((task.endDate - task.startDate) / (1000 * 60 * 60 * 24))
    const diffFromStart = Math.ceil((task.startDate - parseDate(startLine)) / (1000 * 60 * 60 * 24));

    return (
        <div key={task.id} className="relative">
          { diff>0 && <>
            {/* Date label on timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10" style={{ top: `${12 + diffFromStart * 30}px` }}>
              <div className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-md">
                {start}
              </div>
            </div>

            {/* Date label on timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-12 z-10" style={{ top: `${12 + (diffFromStart+diff) * 30}px` }}>
              <div className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-md">
                {end}
              </div>
            </div>

            {/* Content card */}
            <div className={`absolute z-30 ${isLeft ? 'justify-start pr-1/2 left-7/12' : 'justify-end pl-1/2'} w-full`} style={{ top: `${20 + diffFromStart * 30}px` }}>
              <div className={`w-5/12 ${isLeft ? 'pr-8' : 'pl-8'}`}>
                <div style={{ height: `calc(${diff}*30px)` }} className={`bg-gradient-to-br rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 p-5 ${diff>3 ? 'py-5' : 'py-1'} border-2`}>
                  {/* Status badge */}
                  <div className="flex items-center justify-between mb-3">
                    {task.endDate && diff>3 && (
                      <span className="text-xs text-slate-500 font-medium">
                        Duration: {diff} days
                      </span>
                    )}
                  </div>
                  <div className={`grid ${diff > 2 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {/* Task title */}
                    <h3 className="text-lg font-bold text-slate-800">{task.title}</h3>

                    {/* Date range */}
                    <div className="text-sm text-slate-600 mb-3 font-medium flex justify-end">
                      <div className="flex items-center gap-2 w-full pt-1">
                        <span>{formatDate(task.date)}</span>
                        <span>→</span>
                        <span>{formatDate(task.endDate)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {task.endDate && diff>3 && (
                    <p className="text-slate-700 text-sm leading-relaxed">{task.description}</p>
                  )}
                </div>
              </div>
            </div>
          </>}
        </div>
    );
}