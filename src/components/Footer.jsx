import React from "react";
import team from "../content/team.json"

export default function Footer() {

    return (
        <>
            <div className="w-full m-auto bg-amber-100 p-4">
                <div className="w-5/6 m-auto flex flex-row justify-between">
                    <div className="lg:w-1/4">
                        <div className="font-bold text-2xl text-gray-600 mb-4">Team Members</div>
                        <div className="grid grid-cols-2">
                            {team.map((member) =>
                                <div key={member.name} className="p-1">
                                    {member.name}
                                </div>      
                            )}
                        </div>
                    </div>
                    <div className="lg:w-1/4">
                        <div className="font-bold text-2xl text-gray-600 mb-4 flex justify-end">Project Advisors</div>
                        <div className="flex flex-col">
                            <div className="p-1 flex justify-end">
                                João Almeida
                            </div> 
                            <div className="p-1 flex justify-end">
                                Daniel Ferreira
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}