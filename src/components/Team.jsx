import team from "../content/team.json"
import TeamMember from "./TeamMember.jsx"


export default function Team() {

    return (
        <>
            <div className="mb-1 w-5/6 m-auto">
                <h2 className="text-3xl font-bold text-amber-900">Team</h2>
            </div>
            <div className="flex flex-row w-5/6 m-auto">
                {team.map((member) =>
                    <TeamMember key={member.name} member={member}/>
                )}
            </div>
        </>
    );
}