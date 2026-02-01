import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🔐 Protect page
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  // 📡 Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-16 px-4">
      <div className="bg-gray-50 w-full max-w-md rounded-xl shadow-lg p-6">

        {/* Avatar */}
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-black text-white flex items-center justify-center text-3xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* User Info */}
        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {user.name}
          </h2>
          <p className="text-gray-500 text-sm">
            {user.email}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-3">

          <button
            onClick={() => navigate("/orders")}
            className="w-full border border-gray-300 rounded-lg py-2 text-gray-700 hover:bg-gray-100 transition"
          >
            My Orders
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="w-full bg-black text-white rounded-lg py-2 hover:bg-gray-800 transition"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
};

export default Profile;
