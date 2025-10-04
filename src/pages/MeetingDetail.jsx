import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

// Import all meeting markdown files as raw text
const meetingFiles = import.meta.glob('../meetings/*.md', { eager: true, as: 'raw' });

function getMeetingFile(id) {
  // Finds the file whose path ends with `/id.md`
  return Object.entries(meetingFiles).find(([path]) =>
    path.endsWith(`/${id}.md`)
  );
}

export default function MeetingDetail() {
  const { id } = useParams();
  const file = getMeetingFile(id);

  if (!file) {
    return (
      <div className="max-w-2xl mx-auto py-10">
        <p className="text-red-600 font-bold mb-4">Meeting not found.</p>
        <Link to="/meetings" className="underline text-amber-700">← Back to Meetings</Link>
      </div>
    );
  }

  const [fileName, content] = file;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 pt-50">
      <Link to="/meetings" className="text-amber-700 underline mb-4 inline-block">← Back to Meetings</Link>
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="prose max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
        </div>      
    </div>
    </div>
  );
}