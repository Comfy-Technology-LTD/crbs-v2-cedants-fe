import { FaCheckCircle } from "react-icons/fa"
import { IoIosWarning } from "react-icons/io"
import { MdOutlineCommentsDisabled, MdOutlineChangeCircle } from "react-icons/md"





const TransactionStatusToolTip: React.FC = () => {
  return (
    <div className="absolute top-10 mt-2 bg-white shadow-lg border rounded-md p-4 z-50 w-80">
      <h3 className="text-lg font-bold text-gray-800">Transaction Status:</h3>
      <div className="mt-2 space-y-3">
        <div className="flex items-center space-x-2">
          <IoIosWarning size={25} color="#fcba03" />
          <p className="text-gray-700">Initiated: The transaction has been initiated but is not yet finalized.</p>
        </div>
        <div className="flex items-center space-x-2">
          <FaCheckCircle size={25} color="#00802b" />
          <p className="text-gray-700">Approved: The transaction has been approved successfully.</p>
        </div>
        <div className="flex items-center space-x-2">
          <MdOutlineCommentsDisabled size={25} color="#e60000" />
          <p className="text-gray-700">Rejected: The transaction has been rejected.</p>
        </div>
        <div className="flex items-center space-x-2">
          <MdOutlineChangeCircle size={25} color="#ff8000" />
          <p className="text-gray-700">Modify: The transaction requires modifications.</p>
        </div>
      </div>
    </div>
  )
}

export default TransactionStatusToolTip;