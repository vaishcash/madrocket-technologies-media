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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="h-16 flex items-center px-6 border-b">
          <LayoutDashboard className="h-6 w-6 text-indigo-600" />
          <span className="ml-3 text-lg font-semibold text-gray-900">
            Dashboard
          </span>
        </div>
        <nav className="mt-6 px-3">
          <Link
            to="/students"
            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
              location.pathname.includes("/students")
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Users className="h-5 w-5" />
            <span className="ml-3">Students</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full mt-2 flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-3">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
