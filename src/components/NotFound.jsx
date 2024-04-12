import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Block Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">The block you are looking for does not exist.</p>
        <Link to='/' className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Go Back</Link>
      </div>
    </div>
  );
}

export default NotFound;
