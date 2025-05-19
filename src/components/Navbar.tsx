
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";

interface NavbarProps {
  user: User | null;
  logoutUser: () => void;
}

const Navbar = ({ user, logoutUser }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-dark-green font-bold text-xl">Food Saver</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-neutral-gray hover:text-dark-green transition-colors">
            Home
          </Link>
          <Link to="/#features" className="text-neutral-gray hover:text-dark-green transition-colors">
            Features
          </Link>
          
          {/* Auth buttons */}
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline" className="border-dark-green text-dark-green hover:bg-dark-green hover:text-light-beige">
                  Dashboard
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="text-neutral-gray hover:text-dark-green"
                onClick={logoutUser}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" className="border-dark-green text-dark-green hover:bg-dark-green hover:text-light-beige">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-dark-green text-light-beige hover:bg-sage hover:text-dark-green">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-neutral-gray"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-neutral-gray hover:text-dark-green transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/#features" 
              className="text-neutral-gray hover:text-dark-green transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            
            {/* Auth buttons */}
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-neutral-gray hover:text-dark-green transition-colors px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button 
                  className="text-left text-neutral-gray hover:text-dark-green transition-colors px-4 py-2"
                  onClick={() => {
                    logoutUser();
                    setIsMenuOpen(false);
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-neutral-gray hover:text-dark-green transition-colors px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="bg-dark-green text-light-beige hover:bg-sage px-4 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
