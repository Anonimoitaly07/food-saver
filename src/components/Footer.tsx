
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-green text-light-beige py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Food Saver</h2>
            <p className="text-light-beige/70 max-w-md">
              Food Saver helps you reduce food waste, save money, and contribute to a more sustainable future.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-light-beige/70 hover:text-light-beige transition-colors">Home</Link></li>
                <li><Link to="/dashboard" className="text-light-beige/70 hover:text-light-beige transition-colors">Dashboard</Link></li>
                <li><Link to="/dashboard/inventory" className="text-light-beige/70 hover:text-light-beige transition-colors">Inventory</Link></li>
                <li><Link to="/dashboard/recipes" className="text-light-beige/70 hover:text-light-beige transition-colors">Recipes</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Account</h3>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-light-beige/70 hover:text-light-beige transition-colors">Sign In</Link></li>
                <li><Link to="/register" className="text-light-beige/70 hover:text-light-beige transition-colors">Sign Up</Link></li>
                <li><a href="#" className="text-light-beige/70 hover:text-light-beige transition-colors">Reset Password</a></li>
                <li><a href="#" className="text-light-beige/70 hover:text-light-beige transition-colors">Help</a></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg font-medium mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-light-beige/70 hover:text-light-beige transition-colors">Email Us</a></li>
                <li><a href="#" className="text-light-beige/70 hover:text-light-beige transition-colors">Support</a></li>
                <li><a href="#" className="text-light-beige/70 hover:text-light-beige transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-light-beige/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-light-beige/70 text-sm">
            &copy; {currentYear} Food Saver. All rights reserved.
          </p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-light-beige/70 hover:text-light-beige transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-light-beige/70 hover:text-light-beige transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
