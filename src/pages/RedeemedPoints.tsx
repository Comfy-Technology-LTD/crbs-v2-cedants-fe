import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RedeemedPoints = () => {
  const navigate = useNavigate()

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => navigate("/dashboard", { replace: true})} className="text-blue-500 flex items-center mb-4">
        <FaArrowLeft className="mr-2" /> Back to Dashboard
      </button>
      <h2 className="text-2xl font-semibold mb-4">Redeemed Points</h2>
      <div className="flex justify-between items-center mb-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold">Total Points Earned</h3>
          <p className="text-2xl font-bold">120</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold">Total Cash Earned</h3>
          <p className="text-2xl font-bold">GHC 6000</p>
        </div>
      </div>
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-sm">
            <th className="py-3 px-6">Points Redeemed</th>
            <th className="py-3 px-6">Cash Redeemed</th>
            <th className="py-3 px-6">Payment Type</th>
            <th className="py-3 px-6">Redeem Status</th>
            <th className="py-3 px-6">Date Created</th>
            <th className="py-3 px-6">Date Updated</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Replace with dynamic data */}
          <tr className="border-b text-gray-600">
            <td className="py-3 px-6">20</td>
            <td className="py-3 px-6">GHC 1000</td>
            <td className="py-3 px-6">Bank Transfer</td>
            <td className="py-3 px-6">Completed</td>
            <td className="py-3 px-6">2024-01-01</td>
            <td className="py-3 px-6">2024-01-02</td>
            <td className="py-3 px-6"><button className="text-blue-500 hover:underline">Follow Up</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RedeemedPoints;
