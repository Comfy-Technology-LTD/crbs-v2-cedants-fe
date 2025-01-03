import { FaCoins, FaPlus } from "react-icons/fa";
import { FaListCheck, FaRegSquareCheck } from "react-icons/fa6";
import {
  FaHandshake,
  FaFolderOpen,
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
  FaDollarSign,
  FaLaptopHouse,
  FaInfoCircle
} from "react-icons/fa";
import BusinessStats from "../../components/commons/BusinessStats";
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiInstance, { abbreviationGenerator } from "../../util";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DropDownButton from "../../components/commons/DropdownButton";
import PlacingSlipModal from "../../components/commons/PlacingSlipModal";
import ReviewOfferModal from "../../components/commons/ReviewModal";
import { Offer, OfferResponse, OfferStatsRootProps, TransactionStateProps } from "../../interfaces";
import Loading from "../../components/commons/Loading";
import OfferProgress, { TRANSACTION_STATE } from "../../components/commons/OfferProgress";
import TransactionStatusToolTip from "../../components/commons/TransactionStatusToolTip";

const OfferDashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRedeemModalOpen, setRedeemModalOpen] = useState(false);
  const [toggleEye, setToggleEye] = useState(false);
  const [statsData, setStatsData] = useState([
    { title: "Total Offers", value: 0, icon: <FaHandshake /> },
    { title: "Total Open Offers", value: 0, icon: <FaFolderOpen /> },
    { title: "Total Pending Offers", value: 0, icon: <FaHourglassHalf /> },
    { title: "Total Closed Offers", value: 0, icon: <FaCheckCircle /> },
    { title: "Total Unpaid Offers", value: 0, icon: <FaTimesCircle /> },
    { title: "Total Paid Offers", value: 0, icon: <FaDollarSign /> },
  ]);
  const { user } = useAuth();

  const [, setSearchParams] = useSearchParams();
  const [placingSlipModal, setPlacingSlipModal] = useState<boolean>(false);
  const [reviewModal, setReviewModal] = useState<boolean>(false);
  const [offerProgressModal, setOfferProgressModal] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const {
    data: managerOfferData,
    isLoading,
    refetch,
  } = useQuery<OfferResponse>({
    queryKey: ["fetchManagerOffers"],
    queryFn: () => {
      return apiInstance.get(`api/v1/manager-offer?page=${currentPage}`);
    },
  });

  const {
    data: offerStatsData,
    isFetched: isOfferStatsFetched,
    refetch: statsRefetch,
  } = useQuery<OfferStatsRootProps>({
    queryKey: ["managerofferStats"],
    queryFn: () => {
      return apiInstance.get("api/v1/manager-offer-stats");
    },
  });


  const togglePlacingSlipModal = (id: string) => {
    setSearchParams({
      _content: id,
    });
    setPlacingSlipModal(!placingSlipModal);
  };

  const toggleReviewModal = (id: string) => {
    setSearchParams({
      _content: id,
    });
    setReviewModal(!reviewModal)
  };

  const toggleOfferProgressModal = (id: string) => {
    setSearchParams({
      _content: id,
    });
    setOfferProgressModal(!offerProgressModal)
  };


  useEffect(() => {
    if (!reviewModal && !placingSlipModal && !offerProgressModal) {
      setSearchParams({});
    }
  }, [reviewModal, setSearchParams, placingSlipModal, offerProgressModal]);


  useEffect(() => {
    if (isOfferStatsFetched && offerStatsData) {
      const offerDisaggregateData = offerStatsData?.data?.data;
      setStatsData([
        {
          title: "Total Offers",
          value: offerDisaggregateData.total_offers,
          icon: <FaHandshake />,
        },
        {
          title: "Total Open Offers",
          value: offerDisaggregateData.total_open_offers,
          icon: <FaFolderOpen />,
        },
        {
          title: "Total Pending Offers",
          value: offerDisaggregateData.total_pending_offers,
          icon: <FaHourglassHalf />,
        },
        {
          title: "Total Closed Offers",
          value: offerDisaggregateData.total_closed_offers,
          icon: <FaCheckCircle />,
        },
        {
          title: "Total Unpaid Offers",
          value: offerDisaggregateData.total_unpaid_offers,
          icon: <FaTimesCircle />,
        },
        {
          title: "Total Paid Offers",
          value: offerDisaggregateData.total_paid_or_partpayment_offers,
          icon: <FaDollarSign />,
        },
      ]);
    }
  }, [isOfferStatsFetched, offerStatsData]);


  useEffect(() => {
    refetch();
    statsRefetch();
  }, [refetch, currentPage, statsRefetch, reviewModal]);


  if (isLoading) {
    return <Loading title="A moment. Getting your dashboard ready.." />;
  }

  return (
    <div className="py-4">
      <div className="flex flex-col lg:flex-row mb-14 space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="h-auto space-y-2 max-w-lg flex flex-col px-6 pt-6 rounded-lg bg-gradient-to-r from-white to-blue-50 shadow-lg">
          <div className="flex justify-between py-1">
            <span className="font-thin text-sm">
              <span className=" font-semibold">Today:</span>{" "}
              {moment().format("MMMM Do, YYYY")}
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
          <div className="flex items-center space-x-2">
            <div className="border h-20 w-20 rounded-full flex justify-center items-center text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              {abbreviationGenerator(
                user?.assoc_first_name || "",
                user?.assoc_last_name || ""
              )}
            </div>

            <div className="flex-1 space-y-3">
              <h3 className="text-xl -mb-2 font-semibold text-gray-800">
                Good Afternoon, {user?.assoc_first_name} {user?.assoc_last_name}
              </h3>
              <h3 className="font-light text-sm text-gray-500 flex items-center space-x-2">
                <FaLaptopHouse size={20} />
                <span>{user?.insurer?.insurer_company_name}</span>
              </h3>
            </div>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  ml-6">
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
        <div
          className={`flex ${1 === 0 ? "justify-end" : "justify-between"
            } items-center mb-4`}
        >
          {1 ? (
            <input
              type="text"
              placeholder="Search business"
              className="p-2 border max-w-3xl w-96 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            ""
          )}
          <div className="space-x-3 flex">
            {/* <button
              onClick={toggleModal}
              className="flex items-center px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition"
            >
              <FaListCheck className="mr-2" />
              Approve
            </button> */}
            {/* <button className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition">
              <FaUpload className="mr-2" />
              Upload Businesses
            </button> */}
          </div>
        </div>
        <p className=" py-3 text-2xl font-bold text-gray-600">List of offers</p>

        {managerOfferData?.data?.data?.total === 0 ? (
          <div className="flex flex-col items-center py-6 space-y-2 max-w-lg mx-auto mt-10">
            <h1 className="text-2xl font-bold text-gray-800">
              No offers available for approval yet!!
            </h1>
            <p className="text-gray-600 text-center font-light px-6">
              Offers placed by underwriters can be approved here!
            </p>
          </div>
        ) : (
          <>
            <div className="relative overflow-auto bg-white shadow-md h-96 rounded-lg">
              <table className="min-w-full z-50 bg-white border">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Policy Number</th>
                    <th className="py-3 px-6 text-left">Insured</th>
                    <th className="py-3 px-6 text-left">Class of Business</th>
                    <th className="py-3 px-6 text-left">Currency</th>
                    <th className="py-3 px-6 text-left">Sum Insured</th>
                    <th className="py-3 px-6 text-left">Premium</th>
                    <th className="py-3 px-6 text-left">Staff</th>
                    <th className="py-3 px-6 text-left">Trans State</th>
                    <th className="py-3 px-6 text-left">Payment Status</th>
                    <th className="py-3 px-6 text-left">Offer Date</th>
                    <th className="py-3 px-6 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {managerOfferData?.data?.data?.data.map(
                    (item: Offer, index: number) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-3 px-6 text-left">
                          {item?.offer_detail.policy_number}
                        </td>
                        <td className="py-3 px-6 text-left">
                          {item?.offer_detail?.insured_by}
                        </td>
                        <td className="py-3 px-6 text-left">
                          {item?.class_of_business?.business_name}
                        </td>
                        <td className="py-3 px-6 text-left">
                          {item?.offer_detail?.currency}
                        </td>
                        <td className="py-3 px-6 text-left">
                          {item?.sum_insured.toLocaleString()}
                        </td>
                        <td className="py-3 px-6 text-left">
                          {item.premium.toLocaleString()}
                        </td>
                        <td>
                          {item?.insurer_associate?.assoc_first_name}  {item?.insurer_associate?.assoc_last_name}
                        </td>
                        <td className="py-3 px-6 text-left">
                          <span
                            className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${item?.transaction_status === 'APPROVED'
                              ? 'bg-[#00802b]'
                              : item?.transaction_status === 'REJECTED'
                                ? 'bg-[#e60000]'
                                : item?.transaction_status === 'MODIFY'
                                  ? 'bg-[#ff8000]'
                                  : 'bg-[#fcba03]'
                              }`}
                          >
                            {item?.transaction_status}
                          </span>

                        </td>
                        <td className="py-3 px-6 text-left">
                          <span className="px-2 py-1 lowercase rounded-full bg-red-700 text-white text-xs font-semibold">
                            {item?.payment_status}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-left">
                          {moment(item?.created_at).format("MMM Do YYYY")}
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex space-x-2 items-center justify-center w-full">
                            <DropDownButton
                              show_placing={() => togglePlacingSlipModal(item?.id.toString())}
                            />
                            <button onClick={() => toggleReviewModal(item?.id.toString())} className="border flex place-items-center  space-x-2 px-4 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs">
                              <FaRegSquareCheck />
                              <span>Review</span>
                            </button>
                            <button onClick={() => toggleOfferProgressModal(item?.id.toString())}>
                              <FaInfoCircle size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center py-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={managerOfferData?.data?.data?.current_page === 1}
                className={`px-3 py-1 bg-gray-300 text-gray-700 rounded-md ${currentPage === 1 ? "cursor-not-allowed" : "hover:bg-gray-400"
                  } transition`}
              >
                Previous
              </button>
              <div className="text-gray-700">
                Page {managerOfferData?.data?.data?.current_page} of{" "}
                {managerOfferData?.data?.data?.last_page}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  managerOfferData?.data?.data?.current_page ===
                  managerOfferData?.data?.data?.last_page
                }
                className={`px-3 py-1 bg-gray-300 text-gray-700 rounded-md ${managerOfferData?.data?.data?.current_page ===
                  managerOfferData?.data?.data?.last_page
                  ? "cursor-not-allowed"
                  : "hover:bg-gray-400"
                  } transition`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {placingSlipModal && (
        <PlacingSlipModal close={() => setPlacingSlipModal(false)} />
      )}
      {reviewModal && <ReviewOfferModal close={() => setReviewModal(false)} />}
      {offerProgressModal && <OfferProgress close={() => setOfferProgressModal(false)} />}

    </div>
  );
};

export default OfferDashboard;
