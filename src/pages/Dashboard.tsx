import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { LogOut, Users, LayoutDashboard } from "lucide-react";
import { auth } from "../config/firebase";
import toast from "react-hot-toast";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Error logging out");
    }
  };

  return (
    <div className="min-h-screen bg-blue-200 flex justify-center items-center">
      {/* Main Content Container */}
      <div className="flex flex-col w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <LayoutDashboard className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-semibold text-gray-800">
              Dashboard
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-white bg-cyan-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-2">Logout</span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-6 mb-8">
          <Link
            to="/students"
            className={`flex items-center px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
              location.pathname.includes("/students")
                ? "bg-indigo-100 text-indigo-600"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Users className="h-5 w-5" />
            <span className="ml-3">Students</span>
          </Link>
        </nav>

        {/* Main Content (Outlet) */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
