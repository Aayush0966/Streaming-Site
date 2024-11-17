import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-9xl font-bold">404</h1>
      <p className="text-lg mt-4">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-500 transition duration-300">
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;
