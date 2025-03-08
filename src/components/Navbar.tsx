import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Github, Sun, Moon, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleDarkMode } from "../redux/slices/themeSlice";
import logo from "/assets/images/logo.svg"

const Navbar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900", "text-white");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900", "text-white");
      document.body.classList.add("bg-gray-100", "text-gray-900");
    }
  }, [darkMode]);

  return (
    <nav className="fixed left-0 top-0 right-0 bg-[#ffde59] text-[#9e5aff] dark:bg-gray-900 dark:text-white shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side: Logo */}
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <img className="w-9" src={logo} alt="logo" />
          <span className="text-sm">Dsa Visualizer</span>
        </Link>

        {/* Right Side: Links & Theme Toggle (Hidden on Mobile) */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <Link to="/" className="py-2 hover:text-gray-500">
            Home
          </Link>
          <Link to="https://www.linkedin.com/in/suberiq/" target="_blank" className="py-2 hover:text-gray-500">
            About
          </Link>

          {/* GitHub Icon */}
          <Link
            to="https://github.com/suber-IQ"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 hover:text-gray-500"
          >
            <Github size={24} />
          </Link>

          {/* Dark Mode Toggle */}
          <button onClick={() => dispatch(toggleDarkMode())} className="py-2 cursor-pointer hover:text-gray-500">
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        {/* Mobile Menu Button (Opens Sidebar) */}
        <button className="md:hidden" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar (Right Side) */}
      <div
        className={`fixed top-0 right-0 w-24 z-50 h-full bg-[#ffde59] text-[#9e5aff] dark:bg-gray-900 dark:text-white shadow-lg transition-all duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        {/* Close Button */}
        <button onClick={toggleSidebar} className="absolute top-4 right-4">
          <X size={24} />
        </button>

        <div className="p-6 mt-10 space-y-6">
          <Link to="/" className="block text-center py-2 text-lg font-semibold" onClick={toggleSidebar}>
            Home
          </Link>
          <Link to="https://www.linkedin.com/in/suberiq/" target="_blank" className="block text-center py-2 text-lg font-semibold" onClick={toggleSidebar}>
            About
          </Link>

          {/* GitHub Icon */}
          <Link to="https://github.com/suber-IQ" target="_blank" rel="noopener noreferrer" className="flex justify-center py-2">
            <Github size={24} />
          </Link>

          {/* Dark Mode Toggle */}
          <button onClick={() => dispatch(toggleDarkMode())} className="w-full cursor-pointer flex justify-center py-2">
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
