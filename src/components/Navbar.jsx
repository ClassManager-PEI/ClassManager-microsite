import React from "react";
import Logo from "../assets/Logo.png"
import LogoJira from "../assets/logoJIRA.png"
import { Link } from "react-router-dom";
export default function Navbar() {
    return (
        <nav className="fixed text-white w-full px-20 py-2 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
                <Link to="/"><img src={Logo} alt="ClassManager Logo" className="h-24" /></Link>
            </div>
            <div className="flex space-x-10">
                <Link to="/" className="text-2xl text-black font-bold">Home</Link>
                <Link to="/meetings" className="text-2xl text-black font-bold">Meetings</Link>
                <Link to="/documentation" className="text-2xl text-black font-bold">Documentation</Link>
                <Link to="https://classmanagerpei.atlassian.net/jira/software/projects/CRM/boards/1?atlOrigin=eyJpIjoiNDE0ZmYwZThiMjRiNDNiNDljYjE0ZGEyNjNjZDcwYTIiLCJwIjoiaiJ9" className="hover:expand"><img src={LogoJira} alt="JiraLogo" className="w-30"/></Link>

            </div>
        </nav>
    );
}