import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

/**
 * Header with responsive navigation and dynamic styling
 * @returns Header component
 */
const Header = () => {
    const [isOpen, setIsOpen] = useState(false); // State for toggling mobile menu

    return (
        <nav style={{
            backgroundImage: "url('/public/SNES.jpg')", // Path to your background image
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            padding: "20px", // Adjust padding as needed
            textAlign: "center", // Center text within the header
            color: "#fff", // Text color
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <Link to="/" aria-label="LevelUp Lounge Home" style={{ display: "flex", alignItems: "center" }}>
                <img src="/public/LUL logo.png" alt="LevelUp Lounge Logo" className="w-20" />
                <h2 className="text-4xl text-white ml-2">LevelUp<span>Lounge</span></h2>
            </Link>
            <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="btn text-white">
                    {isOpen ? 'Close' : 'Menu'}
                </button>
            </div>
            <div className={`sm:flex ${isOpen ? 'flex' : 'hidden'} flex-col sm:flex-row sm:space-x-8 items-center`}>
                <NavLink to="/" aria-current='page' className={({ isActive }) => isActive ? "btn text-blue-300" : "btn text-white"}>
                    Home
                </NavLink>
                <NavLink to="/create" className={({ isActive }) => isActive ? "btn text-blue-300" : "btn text-white"}>
                    Create new Post
                </NavLink>
            </div>
        </nav>
    );
};

export default Header;
