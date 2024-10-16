import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const DropDownButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      <button 
        onClick={toggleDropdown} 
        className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition"
      >
        Documents
        <FaChevronDown className="ml-2" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200  shadow-lg z-10">
          <button 
            className="w-full text-left px-3 py-2  text-black text-xs hover:text-white hover:bg-blue-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Placing Slip
          </button>
          <button 
            className="w-full text-left px-3 py-2  text-black text-xs hover:text-white hover:bg-blue-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Cover Note
          </button>
          <button 
            className="w-full text-left px-3 py-2  text-black text-xs hover:text-white hover:bg-blue-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Debit Note
          </button>
        </div>
      )}
    </div>
  );
};

export default DropDownButton;