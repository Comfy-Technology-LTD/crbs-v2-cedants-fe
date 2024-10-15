import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate()
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <button onClick={() => navigate("/dashboard", { replace: true })} className="text-blue-500 flex items-center mb-4">
        <FaArrowLeft className="mr-2" /> Back to Dashboard
      </button>
      <div className="flex w-full gap-4">
        <div className=" flex-1 bg-white border p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Personal Details</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-600">First Name</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="First Name" />
            </div>
            <div>
              <label className="block text-gray-600">Last Name</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Last Name" />
            </div>
            <div>
              <label className="block text-gray-600">Email</label>
              <input type="email" className="w-full p-2 border border-gray-300 rounded-md" placeholder="email@example.com" readOnly />
            </div>
            <div>
              <label className="block text-gray-600">Phone Number</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="+233123456789" readOnly />
            </div>
            <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update Profile</button>
            </div>
          </form>
        </div>
        <div className="flex-1 bg-white border p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Password Reset</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-600">Current Password</label>
              <input type="password" className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-gray-600">New Password</label>
              <input type="password" className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-gray-600">Confirm New Password</label>
              <input type="password" className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update Password</button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
