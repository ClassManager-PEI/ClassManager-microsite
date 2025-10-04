import React from "react";
import Logo from "../assets/Logo.png"
import { Link } from "react-router-dom";
export default function Navbar() {
    return (
        <nav className="fixed bg-amber-50 text-white top-0 left-0 w-full z-50 px-20 py-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Link to="/"><img src={Logo} alt="ClassManager Logo" className="h-30 w-30" /></Link>
            </div>
            <div className="space-x-10">
                <Link to="/" className="hover:underline text-2xl text-blue-600">Home</Link>
                <Link to="/ClassManager-microsite/meetings" className="hover:underline text-2xl text-blue-600">Meetings</Link>
                <Link to="/projectState" className="hover:underline text-2xl text-blue-600">Project State</Link>

            </div>
        </nav>
    );
}