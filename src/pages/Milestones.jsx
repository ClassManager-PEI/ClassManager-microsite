// src/pages/Milestones.jsx
import { useMemo } from "react";
import { Link } from "react-router-dom";

// Dynamically import all .md files from src/milestones
const milestoneFiles = import.meta.glob("../milestones/*.md", { eager: true, as: "raw" });

function getMilestoneId(path) {
  return path.split("/").pop().replace(".md", "");
}

function getMilestoneName(id) {
  // Convert "milestone1" -> "Milestone 1", "milestone10" -> "Milestone 10"
  return id.replace(/milestone(\d+)/i, (_, n) => `Milestone ${n}`);
}

function getMilestoneNumber(id) {
  const match = id.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export default function Milestones() {
  const milestones = useMemo(
    () =>
      Object.entries(milestoneFiles)
        .map(([path]) => ({
          id: getMilestoneId(path),
          name: getMilestoneName(getMilestoneId(path)),
          number: getMilestoneNumber(getMilestoneId(path)),
        }))
        .sort((a, b) => a.number - b.number), // ascending order
    []
  );

  return (
    <div className="max-w-2xl mx-auto py-10 pt-50">
      <h1 className="text-3xl font-bold mb-8">Milestones</h1>
      <ul>
        {milestones.map(({ id, name }) => (
          <li key={id} className="mb-6">
            <Link
              to={`/milestones/${id}`}
              className="block p-6 bg-white rounded shadow hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold">{name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
