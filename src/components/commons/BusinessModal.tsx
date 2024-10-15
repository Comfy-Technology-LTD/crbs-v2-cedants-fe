import { BusinessModalProp } from "../../interfaces";

const BusinessModal: React.FC<BusinessModalProp> = ({ close }) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl md:w-full space-y-4">
          <div className="border-b flex justify-between py-2">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 ">
                Create Business
              </h2>
              <h3 className="text-sm font-extralight">
                Enter facultative business with the details below
              </h3>
            </div>
            <div>
              <svg
                onClick={close}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#ff0000"
                className="size-6 cursor-pointer"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 w-full">
              <label className="block text-gray-600">Class of Business</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option disabled selected>
                  Select class of business
                </option>
                <option value="business1">Business Class 1</option>
                <option value="business2">Business Class 2</option>
                <option value="business3">Business Class 3</option>
              </select>
            </div>

            <div className="space-y-1 w-full">
              <label className="block text-gray-600">Policy Number</label>
              <input
                type="text"
                placeholder="e.g. SGS-11288/12334"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 w-full">
              <label className="block text-gray-600">Insured</label>
              <input
                type="text"
                placeholder="e.g. ECG Ghana"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1 w-full">
              <label className="block text-gray-600">Sum Insured</label>
              <input
                type="text"
                placeholder="e.g. ECG Ghana"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 w-full">
              <label className="block text-gray-600">Premium</label>
              <input
                type="number"
                placeholder="e.g. 1200"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1 w-full">
              <label className="block text-gray-600">Rate (%)</label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 12.5"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1 w-full">
              <label className="block text-gray-600">
                Facultative Offer (%)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 12.5"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1 w-full">
              <label className="block text-gray-600">Commission (%)</label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 12.5"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1 w-full">
              <label className="block text-gray-600">
                Preliminary Brokerage (%)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 12.5"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1 w-full">
              <label className="block text-gray-600">Currency</label>
              <input
                type="text"
                placeholder="e.g. USD"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 w-full">
              <label className="block text-gray-600">From</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1 w-full">
              <label className="block text-gray-600">To</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1 w-full">
            <label className="block text-gray-600">Comment</label>
            <textarea
              placeholder="Enter comments here"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={close}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
              Create Business
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessModal;
