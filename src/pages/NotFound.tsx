
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileWarning } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-bizcard-accent/10 flex items-center justify-center">
            <FileWarning size={40} className="text-bizcard-accent" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-bizcard-text">404</h1>
        <p className="text-xl text-bizcard-subtle mb-6">Oops! Page not found</p>
        <Button 
          variant="default" 
          className="bg-bizcard-accent hover:bg-bizcard-accent/90 text-white"
          onClick={() => window.location.href = "/"}
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
