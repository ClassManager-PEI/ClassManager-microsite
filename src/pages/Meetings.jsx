// src/pages/Meetings.jsx
import { useMemo } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

// Dynamically import all .md files from src/meetings
const meetingFiles = import.meta.glob("../meetings/*.md", { eager: true, as: "raw" });

function getMeetingId(path) {
  return path.split("/").pop().replace(".md", "");
}

export default function Meetings() {
  const meetings = useMemo(
    () =>
      Object.entries(meetingFiles).map(([path, content]) => ({
        id: getMeetingId(path),
        preview: content.split("\n").slice(0, 5).join("\n"), // first 5 lines
      })),
    [meetingFiles]
  );

  return (
    <div className="max-w-2xl mx-auto py-10 pt-50">
      <h1 className="text-3xl font-bold mb-8">Meetings</h1>
      <ul>
        {meetings.map(({ id, preview }) => (
          <li key={id} className="mb-6 p-4 bg-white rounded shadow">
            <Link to={`/meetings/${id}`} className="block hover:underline">
            <h2 className="text-xl font-semibold mb-2">{id}</h2>

              <ReactMarkdown>{preview}</ReactMarkdown>
              <span className="text-gray-500">...</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
