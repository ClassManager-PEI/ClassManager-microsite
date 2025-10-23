import ReactMarkdown from "react-markdown";

import { CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react';

export default function ProjectTimeline() {
  const tasks = [
    {
      id: 1,
      title: "Project Kickoff & Planning",
      date: "Oct 1, 2025",
      status: "completed",
      description: "Initial team meeting, scope definition, and resource allocation"
    },
    {
      id: 2,
      title: "Requirements Gathering",
      date: "Oct 5, 2025",
      status: "completed",
      description: "Stakeholder interviews and documentation of requirements"
    },
    {
      id: 3,
      title: "Design Phase",
      date: "Oct 12, 2025",
      status: "completed",
      description: "UI/UX design, wireframes, and mockup creation"
    },
    {
      id: 4,
      title: "Frontend Development",
      date: "Oct 18, 2025",
      status: "in-progress",
      description: "Building responsive UI components and implementing designs"
    },
    {
      id: 5,
      title: "Backend API Development",
      date: "Oct 25, 2025",
      status: "upcoming",
      description: "RESTful API creation, database design, and server setup"
    },
    {
      id: 6,
      title: "Integration Testing",
      date: "Nov 5, 2025",
      status: "upcoming",
      description: "Testing all components together and bug fixing"
    },
    {
      id: 7,
      title: "User Acceptance Testing",
      date: "Nov 15, 2025",
      status: "upcoming",
      description: "Client review and feedback implementation"
    },
    {
      id: 8,
      title: "Deployment",
      date: "Nov 25, 2025",
      status: "upcoming",
      description: "Production deployment and go-live"
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-blue-500" />;
      case 'upcoming':
        return <Circle className="w-6 h-6 text-gray-400" />;
      default:
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-t from-amber-100 to-amber-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Project Timeline</h1>
          <p className="text-slate-600">Track progress and upcoming milestones</p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-300"></div>

          {/* Timeline items */}
          <div className="space-y-8">
            {tasks.map((task, index) => (
              <div key={task.id} className="relative flex items-start">
                {/* Icon */}
                <div className="absolute left-8 -translate-x-1/2 bg-white rounded-full p-1 z-10">
                  {getStatusIcon(task.status)}
                </div>

                {/* Content card */}
                <div className="ml-20 flex-1">
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-slate-200">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-slate-800">{task.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)} capitalize`}>
                        {task.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mb-3">{task.date}</p>
                    <p className="text-slate-600">{task.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Status Legend</h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-slate-600">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-slate-600">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-slate-600">Upcoming</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}