export default function TeamMember({task, isLeft, startLine}) {
    
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'in-progress':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'upcoming':
                return 'bg-gray-100 text-gray-800 border-gray-300';
            default:
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        }
    };
    
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

    console.log(startLine)
    console.log(task.startDate)

    const start = formatDateShort(task.date)
    const end = formatDateShort(task.endDate)
    const diff = Math.ceil((task.endDate - task.startDate) / (1000 * 60 * 60 * 24))
    const diffFromStart = Math.ceil((task.startDate - parseDate(startLine)) / (1000 * 60 * 60 * 24));

    return (
        <div key={task.id} className="relative">

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
          <div className={`absolute z-30 ${isLeft ? 'justify-start pr-1/2 left-7/12' : 'justify-end pl-1/2'} w-full`} style={{ top: `${12 + diffFromStart * 30}px` }}>
            <div className={`w-5/12 ${isLeft ? 'pr-8' : 'pl-8'}`}>
              <div style={{ height: `calc(${diff}*30px)` }} className={`bg-gradient-to-br ${
                task.status === 'completed' ? 'from-green-50 to-green-100' :
                task.status === 'in-progress' ? 'from-blue-50 to-blue-100' :
                'from-gray-50 to-gray-100'
              } rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-5 border-2 ${
                task.status === 'completed' ? 'border-green-300' :
                task.status === 'in-progress' ? 'border-blue-300' :
                'border-gray-300'
              }`}>
                {/* Status badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(task.status)} capitalize`}>
                    {task.status.replace('-', ' ')}
                  </span>
                  {task.endDate && task.endDate.getTime() !== task.startDate.getTime() && (
                    <span className="text-xs text-slate-500 font-medium">
                      Duration: {diff} days
                    </span>
                  )}
                </div>

                {/* Task title */}
                <h3 className="text-lg font-bold text-slate-800 mb-2">{task.title}</h3>

                {/* Date range */}
                <div className="text-sm text-slate-600 mb-3 font-medium">
                  {task.endDate && task.endDate.getTime() !== task.startDate.getTime() ? (
                    <div className="flex items-center gap-2">
                      <span>{formatDate(task.date)}</span>
                      <span>→</span>
                      <span>{formatDate(task.endDate)}</span>
                    </div>
                  ) : (
                    <span>{formatDate(task.date)}</span>
                  )}
                </div>

                {/* Description */}
                <p className="text-slate-700 text-sm leading-relaxed">{task.description}</p>
              </div>

              {/* Connecting line to timeline */}
              <div className={`relative h-0 ${isLeft ? 'ml-auto' : 'mr-auto'}`}>
                <div className={`absolute top-0 w-8 h-0.5 bg-slate-300 ${isLeft ? 'left-full' : 'right-full'}`}></div>
              </div>
            </div>
          </div>
        </div>
    );
}