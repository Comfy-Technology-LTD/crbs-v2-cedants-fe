import { useState } from 'react';
import { LOGO } from '../../constants'; // Import your logo here
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()
  const [saveTestUser ] = useState(localStorage.getItem("test-token") || null)

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="bg-[#F3F4F6] py-4 px-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <img src={LOGO} alt="Visal Re" className="h-8 w-auto sm:h-10" />
          <div className="ml-2">
            <h1 className="text-md -mb-1 text-gray-700 sm:text-md font-semibold">
              Visal Reinsurance Brokers
            </h1>
            <div className="flex gap-2">
              <span className="text-xs italic text-blue-500">speed</span>
              <span className="text-xs italic text-blue-500">professionalism</span>
              <span className="text-xs italic text-blue-500">innovation</span>
            </div>
          </div>
        </div>

        {
          saveTestUser && (
            <div className="flex items-center">
              <span className="border px-3 text-xs text-white mr-2 shadow-md hover:bg-green-900 rounded-full bg-green-800 cursor-pointer">
                Active
              </span>
              <div className="relative">
                <div className="flex items-center cursor-pointer" onClick={toggleMenu}>
                  <div className="flex flex-col items-end mr-2">
                    <h1 className="text-sm -mb-1 font-semibold hover:text-blue-600">
                      Cole Baidoo
                    </h1>
                    <h3 className="text-xs font-extralight">Insurance Company A</h3>
                  </div>
                  <div className="border-2 hover:bg-blue-600 hover:text-white hover:border-blue-600 rounded-full w-14 h-14 flex justify-center items-center">
                    <h3 className="text-2xl font-bold hover:text-white">CB</h3>
                  </div>
                </div>
                {menuOpen && (
                  <div className="absolute z-50 right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={() => {
                      navigate("/dashboard/redeemed-points")
                      toggleMenu()
                    }}>Redeemed Points</button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={() => {
                      navigate("/dashboard/profile")
                      toggleMenu()
                    }}>Profile</button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={() => { 
                      localStorage.removeItem("test-token")
                      navigate("/")
                     }}>Logout</button>
                  </div>
                )}
              </div>
            </div>
          )
        }

      </div>
    </div>
  );
};

export default Header;
