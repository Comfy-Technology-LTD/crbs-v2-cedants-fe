import { useState } from "react";
import CountUp from "react-countup";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RedeemedPoints = () => {
  const navigate = useNavigate();
  const [toggleEye, setToggleEye] = useState(false);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <button
        onClick={() => navigate("/dashboard", { replace: true })}
        className="text-blue-500 flex items-center mb-4"
      >
        <FaArrowLeft className="mr-2" /> Back to Dashboard
      </button>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Redeemed Points</h2>
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
      <div className="flex justify-between items-center mb-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold">Points Earned</h3>
          <p className="text-2xl font-bold">
            {
              toggleEye ? (
                <h4 className="font-light text-gray-800">
                  <CountUp end={120} />
                </h4>
              ) : (
                <div className="border h-5 bg-gray-700"> </div>
              )
            }
          </p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold">Cash Earned</h3>
          <p className="text-2xl font-bold">
            {
              toggleEye ? (
                <h4 className="font-light text-gray-800">
                  GHC {" "}
                  <CountUp end={6000} />
                </h4>
              ) : (
                <div className="border h-5 bg-gray-700"> </div>
              )
            }
          </p>
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
          <tr className="border-b text-gray-600">
            <td className="py-3 px-6">
              {
                toggleEye ? (
                  <h4 className="font-light text-gray-800">
                    20
                  </h4>
                ) : (
                  <div className="border h-5 bg-gray-700"> </div>
                )
              }
            </td>
            <td className="py-3 px-6">
              {
                toggleEye ? (
                  <h4 className="font-light text-gray-800">
                    GHC {" "} 1000
                  </h4>
                ) : (
                  <div className="border h-5 bg-gray-700"> </div>
                )
              }
            </td>
            <td className="py-3 px-6">Bank Transfer</td>
            <td className="py-3 px-6">
              <span className="border px-2 text-xs bg-green-700 text-white rounded-full">Completed</span>
            </td>
            <td className="py-3 px-6">2024-01-01</td>
            <td className="py-3 px-6">2024-01-02</td>
            <td className="py-3 px-6">
              <button className="text-blue-500 hover:underline">
                Follow Up
              </button>
            </td>
          </tr>
          <tr className="border-b text-gray-600">
            <td className="py-3 px-6">
              {
                toggleEye ? (
                  <h4 className="font-light text-gray-800">
                    40
                  </h4>
                ) : (
                  <div className="border h-5 bg-gray-700"> </div>
                )
              }
            </td>
            <td className="py-3 px-6">
              {
                toggleEye ? (
                  <h4 className="font-light text-gray-800">
                    GHC {" "} 4000
                  </h4>
                ) : (
                  <div className="border h-5 bg-gray-700"> </div>
                )
              }
            </td>
            <td className="py-3 px-6">Mobile Money</td>
            <td className="py-3 px-6">
              <span className="border px-2 text-xs bg-green-700 text-white rounded-full">Completed</span>
            </td>
            <td className="py-3 px-6">2024-01-01</td>
            <td className="py-3 px-6">2024-01-02</td>
            <td className="py-3 px-6">
              <button className="text-blue-500 hover:underline">
                Follow Up
              </button>
            </td>
          </tr>
          <tr className="border-b text-gray-600">
            <td className="py-3 px-6">
              {
                toggleEye ? (
                  <h4 className="font-light text-gray-800">
                    30
                  </h4>
                ) : (
                  <div className="border h-5 bg-gray-700"> </div>
                )
              }
            </td>
            <td className="py-3 px-6">
              {
                toggleEye ? (
                  <h4 className="font-light text-gray-800">
                    GHC {" "} 3000
                  </h4>
                ) : (
                  <div className="border h-5 bg-gray-700"> </div>
                )
              }
            </td>
            <td className="py-3 px-6">Cheque</td>
            <td className="py-3 px-6">
              <span className="border px-2 text-xs bg-green-700 text-white rounded-full">Completed</span>
            </td>
            <td className="py-3 px-6">2024-01-01</td>
            <td className="py-3 px-6">2024-01-02</td>
            <td className="py-3 px-6">
              <button className="text-blue-500 hover:underline">
                Follow Up
              </button>
            </td>
          </tr>
          <tr className="border-b text-gray-600">
            <td className="py-3 px-6">
              {
                toggleEye ? (
                  <h4 className="font-light text-gray-800">
                    10
                  </h4>
                ) : (
                  <div className="border h-5 bg-gray-700"> </div>
                )
              }
            </td>
            <td className="py-3 px-6">
              {
                toggleEye ? (
                  <h4 className="font-light text-gray-800">
                    GHC {" "} 500
                  </h4>
                ) : (
                  <div className="border h-5 bg-gray-700"> </div>
                )
              }
            </td>
            <td className="py-3 px-6">Cash</td>
            <td className="py-3 px-6">
              <span className="border px-2 text-xs bg-green-700 text-white rounded-full">Completed</span>
            </td>
            <td className="py-3 px-6">2024-01-01</td>
            <td className="py-3 px-6">2024-01-02</td>
            <td className="py-3 px-6">
              <button className="text-blue-500 hover:underline">
                Follow Up
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RedeemedPoints;
