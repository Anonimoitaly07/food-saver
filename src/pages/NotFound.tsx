
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light-beige px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-dark-green mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-dark-green mb-6">Page Not Found</h2>
        <p className="text-neutral-gray mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button asChild className="bg-dark-green text-light-beige hover:bg-sage hover:text-dark-green">
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
