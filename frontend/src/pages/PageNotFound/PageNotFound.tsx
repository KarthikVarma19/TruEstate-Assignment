import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "iconsax-react";

const PageNotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6">
      <h1 className="text-8xl font-extrabold text-gray-300 select-none">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-gray-800">Page Not Found</h2>
      <p className="mt-2 text-gray-500 max-w-md">The page you're looking for doesn't exist or may have been moved.</p>
      <Link to="/" className="mt-6 inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-lg hover:bg-blue-900 transition-all">
        <ArrowLeft size={16} />
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
