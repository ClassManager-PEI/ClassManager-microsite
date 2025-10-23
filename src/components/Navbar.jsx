import React from "react";
import Logo from "../assets/Logo.png"
import LogoJira from "../assets/logoJIRA.png"
import LogoGitHub from "../assets/logoGitHub.png"
import { Link } from "react-router-dom";
export default function Navbar() {
    return (
        <nav className="fixed text-white w-full px-20 py-2 flex items-center justify-between shadow-sm bg-amber-50 z-50">
            <div className="flex items-center gap-2">
                <Link to="/"><img src={Logo} alt="ClassManager Logo" className="h-24" /></Link>
            </div>
            <div className="flex space-x-10">
                <Link to="/" className="text-2xl text-black font-bold">Home</Link>
                <Link to="/meetings" className="text-2xl text-black font-bold">Meetings</Link>
                <Link to="/documentation" className="text-2xl text-black font-bold">Documentation</Link>
                <a href="https://github.com/ClassManager-PEI/" className="hover:expand"><img src={LogoGitHub} alt="GitHubLogo" className="w-12 h-12 object-contain"/></a>

            </div>
        </nav>
    );
}