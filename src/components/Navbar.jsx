import React from "react";
import Logo from "../assets/Logo.png"
import LogoJira from "../assets/logoJIRA.png"
import { Link } from "react-router-dom";
export default function Navbar() {
    return (
        <nav className="fixed bg-amber-50 text-white top-0 left-0 w-full z-50 px-20 py-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Link to="/"><img src={Logo} alt="ClassManager Logo" className="h-30 w-30" /></Link>
            </div>
            <div className="flex space-x-10">
                <Link to="/" className="hover:underline text-2xl text-blue-600">Home</Link>
                <Link to="/meetings" className="hover:underline text-2xl text-blue-600">Meetings</Link>
                <Link to="https://classmanagerpei.atlassian.net/jira/software/projects/CRM/boards/1?atlOrigin=eyJpIjoiNDE0ZmYwZThiMjRiNDNiNDljYjE0ZGEyNjNjZDcwYTIiLCJwIjoiaiJ9" className="hover:expand"><img src={LogoJira} alt="JiraLogo" className="w-30"/></Link>

            </div>
        </nav>
    );
}