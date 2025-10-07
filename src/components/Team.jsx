import React from "react";
import team from "../content/team.json"
export default function Team() {

    return (
        <>
            <div className="mb-1 w-5/6 m-auto">
                <h2 className="text-3xl font-bold text-amber-900">Team</h2>
            </div>
            <div className="flex flex-row w-5/6 m-auto">
                {team.map((member) =>
                    <div key={member.name} className="w-72 flex flex-col justify-between items-center bg-white/80 rounded-xl shadow-md p-4 my-6 mx-auto max-w-4xl">
                        <div className="flex flex-col items-center gap-4 mt-6 md:mt-0 justify-center">
                            <img
                            src={member.image}
                            alt={member.name + " photo"}
                            className="h-64 w-48 object-contain team-card group transition-all duration-500 ease-in-out hover:scale-110 cursor-pointer opacity-100 translate-y-0"
                            />
                        </div>
                        
                        <div className="flex-1 text-left">
                            <h2 className="text-3xl font-bold text-amber-900 mb-2 flex justify-center">{member.name}</h2>
                            <div className="text-lg text-stone-700 m-auto flex items-center justify-center">
                            {member.role}
                            </div>
                        </div>
                    </div>      
                )}
            </div>
        </>
    );
}