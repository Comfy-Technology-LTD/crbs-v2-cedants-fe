import { useState } from 'react';

interface RedeemPointsModalProps {
  close: () => void
}


const RedeemPointsModal: React.FC<RedeemPointsModalProps> = ({close}) => {
  const [paymentMode, setPaymentMode] = useState("cash");
  const [points, setPoints] = useState(0);

  return (
    <>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Redeem Points</h2>
            
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Mode of Payment</label>
              <select 
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="cash">Cash</option>
                <option value="mobileMoney">Mobile Money</option>
                <option value="bankTransfer">Bank Transfer</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Points to Redeem</label>
              <input 
                type="number" 
                value={points}
                onChange={(e) => setPoints(parseInt(e.target.value))}
                placeholder="Enter number of points" 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button 
                onClick={close} 
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button 
                onClick={() => {}} 
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Redeem
              </button>
            </div>
          </div>
        </div>
    </>
  );
};

export default RedeemPointsModal;
