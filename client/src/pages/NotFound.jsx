import { Link } from "react-router-dom";
import { HeadphonesIcon, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-lg mb-8 text-gray-600">
          The page you're looking for doesn't exist yet or has been moved.
        </p>
        <div className="flex flex-col md:flex-row md:gap-8 gap-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all"
          >
            <Home className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <Link
            to="/support"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all"
          >
            <HeadphonesIcon className="w-5 h-5" />
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;