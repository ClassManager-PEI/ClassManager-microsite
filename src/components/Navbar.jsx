import React from "react";
import Logo from "../assets/Logo.png"
import LogoGitHub from "../assets/logoGitHub.png"
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="fixed text-white w-full px-4 md:px-8 lg:px-20 py-2 flex items-center justify-between shadow-sm bg-amber-50 z-50">
                <div className="flex items-center gap-2">
                    <Link to="/"><img src={Logo} alt="ClassManager Logo" className="h-12 md:h-24" /></Link>
                </div>
                <div className="space-x-10 hidden lg:flex">
                    <Link to="/" className="text-2xl text-black font-bold">Home</Link>
                    <Link to="/meetings" className="text-2xl text-black font-bold">Meetings</Link>
                    <Link to="/documentation" className="text-2xl text-black font-bold">Documentation</Link>
                    <Link to="/calendar" className="text-2xl text-black font-bold">Calendar</Link>

                    <a href="https://github.com/ClassManager-PEI/" className="hover:expand"><img src={LogoGitHub} alt="GitHubLogo" className="w-12 h-12 object-contain"/></a>

                </div>

                {/* Hamburger Button (Mobile) */}
                <button
                    className="lg:hidden text-gray-800"
                    onClick={() => setIsOpen(!isOpen)}
                >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>
            {isOpen && (
                <div className="fixed top-10 md:top-24 left-0 w-full lg:hidden flex flex-col items-start px-6 pb-4 pt-8 gap-3 text-lg shadow-md bg-amber-50 z-40">
                <Link to="/" className="text-black font-bold" onClick={() => setIsOpen(false)}>Home</Link>
                <Link to="/meetings" className="text-black font-bold" onClick={() => setIsOpen(false)}>Meetings</Link>
                <Link to="/documentation" className="text-black font-bold" onClick={() => setIsOpen(false)}>Documentation</Link>
                <Link to="/calendar" className="text-black font-bold" onClick={() => setIsOpen(false)}>Calendar</Link>
                <a href="https://github.com/ClassManager-PEI/" className="text-black font-bold flex flwx-row gap-2">
                    <div>Github</div>
                    <div>
                        <img src={LogoGitHub} alt="GitHubLogo" className="w-8 h-8 object-contain"/>
                    </div>
                </a>
                </div>
            )}
        </>
    );
}