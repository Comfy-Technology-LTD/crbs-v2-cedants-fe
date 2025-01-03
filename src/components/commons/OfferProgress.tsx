import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import apiInstance from "../../util";
import Loading from "./Loading";
import moment from "moment";
import CountUp from "react-countup";
import { useState } from "react";
import { TransactionStateProps } from "../../interfaces";
import { IoIosWarning } from "react-icons/io"
import { MdOutlineCommentsDisabled, MdOutlineChangeCircle } from "react-icons/md"
import { FaCheckCircle } from "react-icons/fa"
import TransactionStatusToolTip from "./TransactionStatusToolTip";


type OfferProgressProps = {
  close: () => void
}


export const TRANSACTION_STATE: TransactionStateProps = {
  initiated: <IoIosWarning size={25} color="#fcba03" />,
  approved: <FaCheckCircle size={25} color="#00802b" />,
  rejected: <MdOutlineCommentsDisabled size={25} color="#e60000" />,
  modify: <MdOutlineChangeCircle size={25} color="#ff8000" />,
}

const OfferProgress: React.FC<OfferProgressProps> = ({ close }) => {
  const [searchParams] = useSearchParams();
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const {
    data: singleOffer,
    isLoading: isSingleLoading,
    isFetching,
  } = useQuery({
    queryKey: ["managerSingleOffer"],
    queryFn: () => {
      const param = searchParams.get("_content");
      return apiInstance.get(`api/v1/offer/${param}`);
    },
    refetchOnWindowFocus: false,
  });


  if (isSingleLoading || isFetching) {
    return <Loading title="Checking offer state..." />;
  }


  return (
    <div className="fixed inset-0 flex py-4 justify-end items-end bg-black bg-opacity-50 z-50">
      <div className="bg-white flex space-y-3 flex-col p-6 rounded-lg shadow-lg h-auto max-w-3xl w-full">
        <div className="relative flex justify-between">
          <div>
            <h2
              className="text-xl font-semibold space-x-1 text-gray-800 py-2 flex items-center">
              <span>Offer Progress</span>
              <span
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)} className=" cursor-pointer">
                {
                  TRANSACTION_STATE[singleOffer?.data.data.transaction_status.toLowerCase() as keyof TransactionStateProps]
                }
              </span>
            </h2>
            <p className="text-sm italic">Track the progress of facultative offer %</p>
          </div>
          {
            showTooltip && <TransactionStatusToolTip />
          }
          {
            singleOffer?.data.data.transaction_status.toLowerCase() === "approved" && (
              <>
                <div className="flex space-x-2 items-center justify-center">
                  <span className={`border text-sm px-3 rounded-xl ${singleOffer?.data.data.offer_status === 'APPROVED'
                    ? 'bg-[#00802b] text-[#004d1a]'
                    : singleOffer?.data.data.offer_status === 'OPEN'
                      ? 'bg-[#e60000] text-[#b30000]'
                      : singleOffer?.data.data.offer_status === 'PENDING'
                        ? 'bg-[#ff8000] text-[#cc6600]'
                        : singleOffer?.data.data.offer_status === 'PENDING'
                          ? 'bg-[#84cc16] text-[#68a211]' : 'bg-[#fcba03] text-[#b18202]'
                    }`}>
                    {singleOffer?.data.data.offer_status}
                  </span>
                  <div className={`animate-pulse w-5 h-5 ${singleOffer?.data.data.offer_status === 'APPROVED'
                    ? 'bg-[#00802b] text-[#004d1a]'
                    : singleOffer?.data.data.offer_status === 'OPEN'
                      ? 'bg-[#e60000] text-[#b30000]'
                      : singleOffer?.data.data.offer_status === 'PENDING'
                        ? 'bg-[#ff8000] text-[#cc6600]'
                        : singleOffer?.data.data.offer_status === 'PENDING'
                          ? 'bg-[#84cc16] text-[#68a211]' : 'bg-[#fcba03] text-[#b18202]'
                    } rounded-full`}></div>
                </div>
              </>
            )
          }
        </div>
        <div className="border-2 border-dashed p-2 mt-1 mb-1 space-y-3 rounded-lg">
          <h2 className="font-semibold text-sm mb-2">
            Facultative offer overview
          </h2>
          <div className="flex justify-between">
            <div className='space-y-2'>
              <p className="text-xs font-thin">
                <span className="font-semibold">Policy Number:</span>{" "}
                {singleOffer?.data.data.offer_detail.policy_number}
              </p>
              <p className="text-xs font-thin">
                {" "}
                <span className="font-semibold">Insured:</span>{" "}
                {singleOffer?.data.data.offer_detail.insured_by}
              </p>
            </div>
            <div className='space-y-2'>
              <p className="text-xs font-thin">
                {" "}
                <span className="font-semibold">Period From:</span>{" "}
                {moment(
                  singleOffer?.data.data.offer_detail.period_of_insurance_from
                ).format("MMMM Do YYYY")}
              </p>
              <p className="text-xs font-thin">
                {" "}
                <span className="font-semibold">Period To:</span>{" "}
                {moment(
                  singleOffer?.data.data.offer_detail.period_of_insurance_to
                ).format("MMMM Do YYYY")}
              </p>
            </div>
            <div className='space-y-2'>
              <p className="text-xs font-thin">
                {" "}
                <span className="font-semibold">Class of Business:</span>{" "}
                {singleOffer?.data.data.class_of_business.business_name}
              </p>
              <p className="text-xs font-thin">
                {" "}
                <span className="font-semibold">Currency:</span>{" "}
                {singleOffer?.data.data.offer_detail.currency}
              </p>
            </div>
          </div>
        </div>

        {
          singleOffer?.data.data.transaction_status.toLowerCase() === "approved" &&
          (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                <div className="flex flex-col items-center justify-center border-2 bg-gradient-to-r from-green-300 to-green-400 text-green-900 shadow-lg border-green-500 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-center">Facultative Offer</h2>
                  <p className="text-4xl font-bold mt-2">
                    <CountUp startVal={0} end={singleOffer?.data.data.facultative_offer} />
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center border-2 bg-gradient-to-r from-blue-300 to-blue-400 text-blue-900 shadow-lg border-blue-500 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-center">Fac Offer Placed</h2>
                  <p className="text-4xl font-bold mt-2">
                    <CountUp startVal={0} end={20} />
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center border-2 bg-gradient-to-r from-red-300 to-red-400 text-red-900 shadow-lg border-red-500 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-center">Fac Offer Left</h2>
                  <p className="text-4xl font-bold mt-2">
                    <CountUp startVal={0} end={14} />
                  </p>
                </div>
              </div>
              <div className=" space-y-2 border-2 border-dashed rounded-lg p-2">
                <h3 className=" text-2xl font-bold">Securities:</h3>
                <div className="grid grid-cols-2">
                  <h3 className="text-lg font-semibold">Reinsurer</h3>
                  <h3 className="text-lg text-end font-semibold">Share (%)</h3>
                </div>
                {
                  [1, 1, 1, 1,].map((_, key) => (
                    <div key={key} className="grid grid-cols-2">
                      <h3 className="text-lg font-thin">Ghana Reinsurance Company LTD</h3>
                      <h3 className="text-lg text-end font-thin">10</h3>
                    </div>
                  ))
                }
              </div>
            </>
          )
        }


        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={close}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}




export default OfferProgress;