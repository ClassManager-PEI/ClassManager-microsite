import tasks from "../content/calendar.json";
import Task from "../components/Task";

export default function ProjectTimeline() {

  const parseDate = (dateStr) => {
    return new Date(dateStr);
  };

  // Process tasks to include start and end dates
  const processedTasks = tasks.map(task => ({
    ...task,
    startDate: parseDate(task.date),
    endDate: task.endDate ? parseDate(task.endDate) : parseDate(task.date)
  })).sort((a, b) => a.startDate - b.startDate);

  return (
    <div className="min-h-screen h-[190vh] bg-gradient-to-t from-amber-100 to-amber-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Project Timeline</h1>
          <p className="text-slate-600">Track progress and upcoming milestones</p>
        </div>


        {/* Central timeline axis */}
        <div className="h-[172vh] absolute left-1/2 top-72 min-h-screen w-1 bg-gradient-to-t from-gray-800 via-gray-400 to-gray-50 transform -translate-x-1/2"></div>

        {/* Timeline items */}
        <div className="space-y-12">
          {processedTasks.map((task, index) => {
            return <Task key={task.id} task={task} isLeft={index % 2 === 0} startLine={processedTasks[0].date}/>
          })}
        </div>
        
      </div>
    </div>
  );
}