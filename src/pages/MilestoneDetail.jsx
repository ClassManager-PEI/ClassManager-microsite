// src/pages/MilestoneDetail.jsx
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

// Import all milestone markdown files as raw text
const milestoneFiles = import.meta.glob('../milestones/*.md', { eager: true, as: 'raw' });

function getMilestoneFile(id) {
    return Object.entries(milestoneFiles).find(([path]) =>
        path.endsWith(`/${id}.md`)
    );
}

export default function MilestoneDetail() {
    const { id } = useParams();
    const file = getMilestoneFile(id);

    if (!file) {
        return (
            <div className="max-w-2xl mx-auto px-4 pt-50">
                <p className="text-red-600 font-bold mb-4">Milestone not found.</p>
                <Link to="/milestones" className="underline text-amber-700">← Back to Milestones</Link>
            </div>
        );
    }

    const [, content] = file;

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 pt-50">
            <Link to="/milestones" className="text-amber-700 underline mb-4 inline-block">← Back to Milestones</Link>
            <div className="bg-white rounded-xl shadow-md p-8">
                <div className="prose max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
