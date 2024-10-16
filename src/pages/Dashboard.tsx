import { FaCoins, FaMoneyBillWave, FaPlus } from "react-icons/fa";
import {
  FaHandshake,
  FaFolderOpen,
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
  FaDollarSign,
} from "react-icons/fa";
import BusinessStats from "../components/commons/BusinessStats";
import CountUp from "react-countup";
import { useState } from "react";
import BusinessModal from "../components/commons/BusinessModal";
import RedeemPointsModal from "../components/commons/RedeemPointsModal";
import moment from "moment";
import DropDownButton from "../components/commons/DropDownButton";

const statsData = [
  { title: "Total Offers", value: 5, icon: <FaHandshake /> },
  { title: "Total Open Offers", value: 25, icon: <FaFolderOpen /> },
  { title: "Total Pending Offers", value: 15, icon: <FaHourglassHalf /> },
  { title: "Total Closed Offers", value: 45, icon: <FaCheckCircle /> },
  { title: "Total Unpaid Offers", value: 5, icon: <FaTimesCircle /> },
  { title: "Total Paid Offers", value: 5, icon: <FaDollarSign /> },
];

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRedeemModalOpen, setRedeemModalOpen] = useState(false);
  const [toggleEye, setToggleEye] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const sampleData = [...Array(20)].map((_, i) => ({
    policyNumber: `POL-${i + 1}`,
    insured: `Insured Name ${i + 1}`,
    sumInsured: "$100,000",
    premium: "$500",
    offerStatus: "Open",
    paymentStatus: "Unpaid",
    businessDate: "2023-01-01",
  }));

  const totalPages = Math.ceil(sampleData.length / itemsPerPage);
  const currentData = sampleData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="py-4">
      <div className="flex flex-col lg:flex-row mb-14 space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="h-auto max-w-lg flex flex-col p-6 rounded-lg bg-gradient-to-r from-white to-blue-50 shadow-lg">
          <div className="flex justify-between py-1">
            <span className="font-thin text-sm">
              <span className=" font-semibold">Today:</span> {moment().format("MMM Do YYYY")}
            </span>
            <div>
              {toggleEye ? (
                <svg
                  onClick={() => setToggleEye(false)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5 cursor-pointer hover:shadow-md"
                >
                  <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                  <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                  <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                </svg>
              ) : (
                <svg
                  onClick={() => setToggleEye(true)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5 cursor-pointer hover:shadow-md"
                >
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  <path
                    fillRule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>

              )}
            </div>
          </div>
          <div className="flex items-center">
            <div className="border h-20 w-20 rounded-full flex justify-center items-center text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              CB
            </div>

            <div className="flex-1 space-y-3">
              <h3 className="text-2xl -mb-4 font-semibold text-gray-800">
                Good Afternoon, Cole Baidoo
              </h3>
              <h3 className="font-light text-sm text-gray-500">
                Insurance Company A
              </h3>

              <div className="flex space-x-5 mt-2">
                <div className="flex items-center space-x-2">
                  <FaCoins className="text-yellow-400" size={30} />
                  <div>
                    <h3 className="font-semibold text-sm text-gray-600">
                      Points Earned
                    </h3>
                    {
                      toggleEye ? (<h4 className="text-sm font-light text-gray-800">
                        <CountUp end={45} />
                      </h4>) : (
                        <div className="border h-5 bg-gray-700"> </div>
                      )
                    }
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <FaMoneyBillWave className="text-green-400" size={30} />
                  <div>
                    <h3 className="font-semibold text-sm text-gray-600">
                      Cash Earned
                    </h3>
                    {
                      toggleEye ? (
                        <h4 className="text-sm font-light text-gray-800">
                          GHC
                          <CountUp end={5000} />
                        </h4>
                      ) : (
                        <div className="border h-5 bg-gray-700"> </div>
                      )
                    }
                  </div>
                </div>
              </div>

              <button
                onClick={() => setRedeemModalOpen(true)}
                className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-2 rounded-md font-semibold hover:from-green-500 hover:to-green-600 transition-all duration-300 ease-in-out shadow-md"
              >
                Redeem points
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ml-6">
          {statsData.map((stat, index) => (
            <BusinessStats
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
            />
          ))}
        </div>
      </div>

      <div className="p-6 bg-gray-50 shadow-lg ">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search business"
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="space-x-3 flex">
            <button
              onClick={toggleModal}
              className="flex items-center px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition"
            >
              <FaPlus className="mr-2" />
              Create Business
            </button>
            {/* <button className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition">
              <FaUpload className="mr-2" />
              Upload Businesses
            </button> */}
          </div>
        </div>

        <div className="overflow-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                <th className="py-3 px-6 text-left">Policy Number</th>
                <th className="py-3 px-6 text-left">Insured</th>
                <th className="py-3 px-6 text-left">Sum Insured</th>
                <th className="py-3 px-6 text-left">Premium</th>
                <th className="py-3 px-6 text-left">Offer Status</th>
                <th className="py-3 px-6 text-left">Payment Status</th>
                <th className="py-3 px-6 text-left">Business Date</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {currentData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{item.policyNumber}</td>
                  <td className="py-3 px-6 text-left">{item.insured}</td>
                  <td className="py-3 px-6 text-left">{item.sumInsured}</td>
                  <td className="py-3 px-6 text-left">{item.premium}</td>
                  <td className="py-3 px-6 text-left">
                    <span className="px-2 py-1 rounded-full bg-orange-700 text-white text-xs font-semibold">
                      {item.offerStatus}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span className="px-2 py-1 rounded-full bg-red-700 text-white text-xs font-semibold">
                      {item.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left">{item.businessDate}</td>
                  <td className="py-3 px-6 flex text-left space-x-2">
                    <DropDownButton />
                    <button
                      onClick={toggleModal}
                      className="flex items-center px-3 py-1 bg-orange-500 text-white rounded-md text-xs hover:bg-orange-600 transition"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center py-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 bg-gray-300 text-gray-700 rounded-md ${currentPage === 1 ? "cursor-not-allowed" : "hover:bg-gray-400"
              } transition`}
          >
            Previous
          </button>
          <div className="text-gray-700">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 bg-gray-300 text-gray-700 rounded-md ${currentPage === totalPages
              ? "cursor-not-allowed"
              : "hover:bg-gray-400"
              } transition`}
          >
            Next
          </button>
        </div>
      </div>
      {isOpen && <BusinessModal close={() => setIsOpen(false)} />}
      {isRedeemModalOpen && (
        <RedeemPointsModal close={() => setRedeemModalOpen(false)} />
      )}
    </div>
  );
};

export default Dashboard;
