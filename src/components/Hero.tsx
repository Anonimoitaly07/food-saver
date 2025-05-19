
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-light-beige py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-green mb-6">
            Save Food, Save Money, Save the Planet
          </h1>
          <p className="text-lg md:text-xl text-neutral-gray mb-8">
            Track your food inventory, get recipe suggestions, and reduce waste with Food Saver.
            Join thousands of users making a difference, one meal at a time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              asChild
              className="bg-dark-green text-light-beige hover:bg-sage hover:text-dark-green py-6 px-8 text-lg rounded-2xl shadow-lg"
            >
              <Link to="/register">Get Started</Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="border-dark-green text-dark-green hover:bg-dark-green hover:text-light-beige py-6 px-8 text-lg rounded-2xl"
            >
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-16 h-16 mx-auto bg-sage/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-dark-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark-green mb-2">Track Your Food</h3>
              <p className="text-neutral-gray">Keep an inventory of all your food items and their expiration dates.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-16 h-16 mx-auto bg-sage/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-dark-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark-green mb-2">Get Alerts</h3>
              <p className="text-neutral-gray">Receive notifications when your food is about to expire.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-16 h-16 mx-auto bg-sage/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-dark-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark-green mb-2">Find Recipes</h3>
              <p className="text-neutral-gray">Get recipe suggestions based on ingredients you have.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
