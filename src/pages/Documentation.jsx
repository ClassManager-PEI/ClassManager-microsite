import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function MeetingDetail() {

  const files = import.meta.glob('../meetings/Documentation.md', { eager: true, as: 'raw' });

  const entries = Object.entries(files);
  if (entries.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 pt-50">
        <p className="text-red-600 font-bold mb-4">Documentation not found.</p>
        <a href="/" className="underline text-amber-700">← Back to Meetings</a>
      </div>
    );
  }

  const [fileName, content] = entries[0];

  return (
    <div className="w-3/4 mx-auto py-10 px-4 pt-50">
      <Link to="/meetings" className="text-amber-700 underline mb-4 inline-block">← Back to Meetings</Link>
      <div className="bg-white rounded-xl shadow-md p-8 w-full flex flex-row">
        <div className="prose">
        <ReactMarkdown>{content}</ReactMarkdown>
        </div>      
    </div>
    </div>
  );
}