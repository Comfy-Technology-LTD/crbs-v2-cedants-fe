import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import apiInstance, { abbreviationFullNameGenerator, errorHandler } from '../../util';
import moment from 'moment';
import Loading from './Loading';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { ErrorBag, ErrorResponse, ReviewProps, TransactionStateProps } from '../../interfaces';
import parse from "html-react-parser";
import TransactionStatusToolTip from './TransactionStatusToolTip';
import { TRANSACTION_STATE } from './OfferProgress';
import ReviewThread from './ReviewThread';


type MessageProps = {
  'approved': string;
  'rejected': string;
  'modify': string;
}


interface ReviewOfferModalProps {
  close: () => void
}

const ReviewOfferModal: React.FC<ReviewOfferModalProps> = ({ close }) => {
  const [selectedOption, setSelectedOption] = useState<keyof MessageProps | null>(null);
  const [comments, setComments] = useState<string>('');
  const { user } = useAuth()
  const [message] = useState<MessageProps>({
    approved: 'Approving this offer will make it available to visal to find facultative reinsurance support.',
    rejected: 'Declining this offer will render it unavailable for Visal to secure facultative reinsurance coverage.',
    modify: 'Include the necessary changes to the field provided below.',
  })
  const [searchParams] = useSearchParams();
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const approveOfferMutation = useMutation({
    mutationKey: ["approveOfferMutate"],
    mutationFn: (data: {
      selectedOption: string,
      comment?: string
    }) => {
      const param = searchParams.get("_content");
      return apiInstance.post(`/api/v1/manager-offer-approve/${param}`, data);
    },
    onSuccess: (data) => {
      toast.success(data.data.message, {
        theme: "colored",
        position: "top-center",
      });
      close()
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error?.status == 422 || error?.status == 500) {
        const errorBag = error?.response?.data?.errors as ErrorBag;
        errorHandler(errorBag);
      }
      console.log("Something went wrong");
    },
  });

  const handleSubmit = () => {

    if (!selectedOption) {
      toast.warn("Select a review option", {
        theme: 'colored'
      })
      return;
    }

    const data: {
      selectedOption: string,
      comment?: string
    } = {
      selectedOption: selectedOption as string,
      comment: comments

    }
    approveOfferMutation.mutateAsync(data)

  };

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

  if (approveOfferMutation.isLoading) {
    return <Loading title="Reviewing offer. Just a moment..." />;
  }


  return (
    <div className="fixed inset-0 flex py-4 justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white flex flex-col sh-auto overflow-y-auto scrollbar-hide p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <div className='relative'>
          <h2 className="text-xl font-semibold text-gray-800 py-2 flex space-x-2">
            <span>Review Offer</span>
            <span
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)} className=" cursor-pointer">
              {
                TRANSACTION_STATE[singleOffer?.data.data.transaction_status.toLowerCase() as keyof TransactionStateProps]
              }
            </span>
          </h2>
          {
            showTooltip && <TransactionStatusToolTip />
          }
          <div className={`border p-2 font-semibold mb-4 bg-red-400/30 text-red-800  rounded-md`}>
            <p className=' font-medium'>
              If you choose to <span className='font-bold'>modify</span> or <span className='font-bold'>decline</span> this offer, all messages will be between you
              <span className='font-semibold'> ({user?.assoc_first_name} {user?.assoc_last_name})</span> and the staff member
              <span className='font-semibold'>({singleOffer?.data.data.insurer_associate.assoc_first_name} {singleOffer?.data.data.insurer_associate.assoc_last_name})</span>
            </p>
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
        </div>


        <div className='flex-1 mb-6'>
          <h3 className=' font-semibold'>Previous Reviews</h3>
          <ReviewThread reviews={(JSON.parse(singleOffer?.data.data?.reviews || "[]")) as ReviewProps[]} />
          {/* <div className='border-2 border-dashed space-y-4 rounded-lg h-full overflow-y-scroll scrollbar-hide p-2'>
            {(
              ((JSON.parse(singleOffer?.data.data?.reviews || "[]")) as ReviewProps[]).map(
                (message: ReviewProps, key: number) => (
                  <div
                    key={key}
                    className={`flex ${message.position === "Manager"
                      ? "flex-row-reverse"
                      : "flex-row"
                      } space-x-1 px-2`}
                  >
                    <div className={`h-10 w-10 rounded-full  flex justify-center items-center text-xl font-bold ${message.position === "Manager" ? "bg-orange-700 ml-2" : "bg-blue-700 mr-2"} text-white`}>
                      {abbreviationFullNameGenerator(message.reviewer)}
                    </div>
                    <div className={`border flex-1 h-auto p-2 mr-2 relative rounded-lg sbg-[#F3F4F6] ${message.position === "Manager" ? "bg-orange-500/20" : "bg-blue-500/20"} `}>
                      <p className=" font-extralight">
                        {" "}
                        <span className="font-semibold">
                          {message.reviewer}
                        </span>{" "}
                        {moment(message.timestamp).format("HH:mm")}
                      </p>
                      <div className="mt-4">{parse(message.message || "")}</div>
                      <p className="flex justify-between w-full px-1 mt-1 text-sm font-extralight">
                        <p>
                          <span className="font-semibold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-6 text-green-700"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </p>
                        {moment(message.timestamp).format("MMMM Do YYYY")}
                      </p>
                    </div>
                  </div>
                )
              )
            )
            }
          </div> */}
        </div>


        {
          !['approved', 'rejected'].includes(singleOffer?.data.data.transaction_status.toLowerCase()) ? (
            <>
              <div className='mb-4 mt-6'>
                <p>Please select a review option</p>
              </div>
              {
                selectedOption && (
                  <div className={`border p-2 font-semibold mb-4 ${selectedOption == 'approved' ? 'bg-green-400/30 text-green-800' : selectedOption == 'rejected' ? "bg-red-400/30 text-red-800" : "bg-gray-400/30 text-gray-800"} rounded-md`}>
                    <p>
                      {
                        message[selectedOption]
                      }
                    </p>
                  </div>
                )
              }
            </>
          ) : ""
        }
        <div className="flex flex-col gap-4">
          {
            !['approved', 'rejected'].includes(singleOffer?.data.data.transaction_status.toLowerCase()) ? (
              <>
                <div>
                  <label htmlFor="decision" className="block text-gray-700 font-medium mb-2">
                    Choose an action
                  </label>
                  <select
                    id="decision"
                    value={selectedOption || ''}
                    onChange={(e) => setSelectedOption(e.target.value as keyof MessageProps)}
                    className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                  >
                    <option value="">
                      Select an option
                    </option>
                    <option value="approved">Approve</option>
                    <option value="rejected">Decline</option>
                    <option value="modify">Modify</option>
                  </select>
                </div>
                {selectedOption === 'modify' && (
                  <div>
                    <label htmlFor="comments" className="block text-gray-700 font-medium mb-2">
                      Add comments
                    </label>
                    <textarea
                      id="comments"
                      placeholder="Provide details about the required modifications"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="w-full p-2 border rounded-lg focus:ring focus:ring-yellow-300 focus:outline-none"
                      rows={4}
                    />
                  </div>
                )}
              </>
            ) : ""
          }

          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={close} // Replace with actual close logic
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Cancel
            </button>
            {
              !['approved', 'rejected'].includes(singleOffer?.data.data.transaction_status.toLowerCase()) ? (
                <button
                  onClick={handleSubmit}
                  className={`px-4 py-2 rounded-lg text-white ${selectedOption ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  disabled={!selectedOption}
                >
                  Submit
                </button>
              ) : ""
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewOfferModal;
