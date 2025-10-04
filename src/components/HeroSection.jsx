import Logo from '../assets/Logo.png'; 
import { Link } from "react-router-dom";
export default function HeroSection() {
  return (
    <div className='pt-20'> 
    <section className="flex flex-col md:flex-row justify-between items-center bg-white/80 rounded-xl shadow-md p-8 mt-8 mx-auto max-w-4xl">
      {/* Left side - Text */}
      <div className="flex-1 text-left">
        <h2 className="text-3xl font-bold text-amber-900 mb-2">ClassManager</h2>
        <p className="text-lg text-stone-700">
          An all-in-one platform to organize classes, schedules and rooms with ease.
        </p>
      </div>

      {/* Right side - Logo + Button */}
      <div className="flex flex-col items-center gap-4 mt-6 md:mt-0">
        <img
          src={Logo}
          alt="ClassManager Logo"
          className="h-20 w-20 object-contain"
        />
        <Link to="/Meetings" className="bg-amber-400 hover:bg-amber-500 text-white font-semibold px-6 py-2 rounded-lg shadow transition">See Meetings Content</Link>
      </div>
    </section>
    </div>
  );
}
