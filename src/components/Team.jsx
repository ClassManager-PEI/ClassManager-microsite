import team from "../content/team.json"
import TeamMember from "./TeamMember.jsx"


export default function Team() {

    return (
        <>
            <div className="mb-1 container m-auto">
                <h2 className="text-3xl font-bold text-amber-900">Team</h2>
            </div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-5 container m-auto">
                {team.map((member) =>
                    <TeamMember key={member.name} member={member}/>
                )}
            </div>
        </>
    );
}