import ReactMarkdown from "react-markdown";

export default function Documentation() {

  const files = import.meta.glob([
    '../documentation/Documentation.md',
  ], { eager: true, as: 'raw' });

  const entries = Object.entries(files);
  if (entries.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 pt-50">
        <p className="text-red-600 font-bold mb-4">Documentation not found.</p>
        <a href="/" className="underline text-amber-700">← Back to Meetings</a>
      </div>
    );
  }

  const [mdFile, mdContent] = entries[0];

  return (
    <div className="w-3/4 mx-auto py-10 px-4 pt-50">
      <div className="bg-white rounded-xl shadow-md p-8 w-full">
        <div className="prose bg-white rounded-xl px-8 w-full max-w-none">
          <ReactMarkdown>
            {mdContent}
          </ReactMarkdown>     
        </div>
      </div>
    </div>
  );
}