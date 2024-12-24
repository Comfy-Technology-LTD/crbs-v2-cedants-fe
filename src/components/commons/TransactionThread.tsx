import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import apiInstance, {
  abbreviationFullNameGenerator,
  errorHandler,
} from "../../util";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import {
  ErrorBag,
  ErrorResponse,
  OfferMessageContentProps,
  OfferMessageProps,
} from "../../interfaces";
import parse from "html-react-parser";

interface TransactionThreadProps {
  close: () => void;
}

const TransactionThread: React.FC<TransactionThreadProps> = ({ close }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [searchParams] = useSearchParams();
  const [chatMessage, setChatMessage] = useState<OfferMessageContentProps[]>(
    []
  );

  const {
    data: singleOffer,
    isLoading: isSingleLoading,
    isFetching,
  } = useQuery({
    queryKey: ["singleOffer"],
    queryFn: () => {
      const param = searchParams.get("_content");
      return apiInstance.get(`api/v1/offer/${param}`);
    },
    refetchOnWindowFocus: false,
  });

  const {
    data: offerMessage,
    isLoading: isOfferMessageLoading,
    isFetching: isOfferMessageFetching,
    refetch,
  } = useQuery<OfferMessageProps>({
    queryKey: ["offerMessage"],
    queryFn: async () => {
      const param = searchParams.get("_content");
      const response = await apiInstance.get(`api/v1/offer-messages/${param}`);
      const data = response?.data.data;
      if (data) {
        data.message_content = JSON.parse(
          data?.message_content || "[]"
        ).reverse();
      }
      return data;
    },
    refetchOnWindowFocus: false,
  });

  const offerMessageMutation = useMutation({
    mutationKey: ["offerMessageMutate"],
    mutationFn: (data: { message: string }) => {
      const param = searchParams.get("_content");
      return apiInstance.post(`/api/v1/offer-messaging/${param}`, data);
    },
    onSuccess: (data) => {
      toast.success(data.data.message, {
        theme: "colored",
        position: "top-center",
      });
      setContent("");
      refetch();
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error?.status == 422 || error?.status == 500) {
        const errorBag = error?.response?.data?.errors as ErrorBag;
        errorHandler(errorBag);
      }
      console.log("Something went wrong");
    },
  });

  const handleMessageSending = () => {
    if (!content) {
      toast.warn("Enter some message to be sent", {
        theme: "colored",
      });
      return;
    }
    const data = {
      message: content,
    };
    offerMessageMutation.mutate(data);
  };

  useEffect(() => {
    console.log(offerMessage?.message_content);
    setChatMessage(offerMessage?.message_content || []);
  }, [offerMessage, refetch, setChatMessage, isOfferMessageFetching]);

  // useEffect(() => {
  //    refetch()
  // }, [refetch] )

  if (isSingleLoading || isFetching) {
    return <Loading title="Checking offer state..." />;
  }

  if (isOfferMessageLoading) {
    return <Loading title="Finding transaction threads..." />;
  }

  return (
    <div className="fixed transition-all duration-700 inset-0 flex items-center justify-end bg-black bg-opacity-50">
      <div className="flex h-full px-2">
        <svg
          onClick={close}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="#ff0000"
          className="size-9 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
      <div className="bg-white p-6 rounded-tl-lg rounded-bl-lg shadow-lg max-w-3xl overflow-hidden h-full md:w-full pb-10 space-y-4">
        <div className="space-y-3">
          <div>
            <h1 className="text-lg font-semibold">Transaction Thread</h1>
            <p className=" text-sm font-thin">
              Keep track of all conversations on particular offer
            </p>
          </div>
          <div className="border-2 border-dashed p-2 mt-1 mb-1 rounded-lg">
            <h2 className="font-semibold text-sm mb-2">
              Facultative offer overview
            </h2>
            <div className="flex justify-between">
              <div>
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
              <div>
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
            </div>
          </div>
        </div>

        <div
          className={`border h-[50vh]  rounded-lg space-y-4 py-2 flex  ${
            chatMessage?.length ? "flex-col" : " justify-center items-center "
          }  bg-transparent overflow-y-scroll scrollbar-hide`}
          contentEditable={false}
        >
          {chatMessage?.length ? (
            (chatMessage as OfferMessageContentProps[]).map(
              (message: OfferMessageContentProps, key: number) => (
                <div
                  key={key}
                  className={`flex ${
                    message.state === "EXTERNAL"
                      ? "flex-row-reverse"
                      : "flex-row"
                  } space-x-1 px-2`}
                >
                  <div className={`h-10 w-10 rounded-full flex justify-center items-center text-xl font-bold ${ message.state === "EXTERNAL" ? "bg-orange-700" : "bg-blue-700"} text-white`}>
                    {abbreviationFullNameGenerator(message.sender_name)}
                  </div>
                  <div className={`border flex-1 h-auto p-2 mr-2 relative rounded-lg sbg-[#F3F4F6] ${ message.state === "EXTERNAL" ? "bg-orange-500/20" : "bg-blue-500/20"} `}>
                    <p className=" font-extralight">
                      {" "}
                      <span className="font-semibold">
                        {message.sender_name}
                      </span>{" "}
                      {moment(message.timestamp).format("HH:mm")}
                    </p>
                    <div className="mt-4">{parse(message.message)}</div>
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
          ) : (
            <div className="border flex justify-center flex-col items-center p-4 rounded-xl bg-green-800/70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={0.5}
                stroke="currentColor"
                className="size-18 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
              <h1 className="text-xl font-thin mt-2 text-white">
                No Messages yet
              </h1>
              {/* <h1 className="text-xl font-thin mt-2 text-white">Start a conversation with VISAL RE Staff on this particular offer here</h1> */}
            </div>
          )}

          {/* <div className="flex space-x-1 px-2">
            <div className="h-10 w-10 rounded-full flex justify-center items-center text-xl font-bold bg-orange-700 text-white">
              {abbreviationGenerator("Cole", "Baidoo")}
            </div>
            <div className="border flex-1 h-auto p-2 relative rounded-lg sbg-[#F3F4F6] bg-orange-500/20 " >
              <p className=" font-extralight"> <span className="font-semibold">Cole Baidoo</span> {moment().format("HH:MM:SS")}</p>
              <div className="mt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur optio quasi vel iusto consequatur quae porro aliquam, delectus voluptatum harum ex facere quod non cupiditate repellendus, eius quaerat reiciendis? Nulla?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur optio quasi vel iusto consequatur quae porro aliquam, delectus voluptatum harum ex facere quod non cupiditate repellendus, eius quaerat reiciendis? Nulla?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur optio quasi vel iusto consequatur quae porro aliquam, delectus voluptatum harum ex facere quod non cupiditate repellendus, eius quaerat reiciendis? Nulla?
              </div>
              <p className="flex justify-between w-full px-1 mt-1 text-sm font-extralight">
                <p><span className="font-semibold">Status: </span>Delivered</p>
                {moment().format("MMMM Do YYYY")}
              </p>
            </div>
          </div>

          <div className="flex flex-row-reverse space-x-1 px-2">
            <div className="h-10 ml-1 w-10 rounded-full flex justify-center items-center text-xl font-bold bg-blue-700 text-white">
              {abbreviationGenerator("John", "Doe")}
            </div>
            <div className="border flex-1 h-auto p-2 relative rounded-lg bg-blue-500/20 " >
              <p className=" font-extralight"> <span className="font-semibold">John Doe</span> {moment().format("HH:MM:SS")}</p>
              <div className="mt-4 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur optio quasi vel iusto consequatur quae porro aliquam, delectus voluptatum harum ex facere quod non cupiditate repellendus, eius quaerat reiciendis? Nulla?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur optio quasi vel iusto consequatur quae porro aliquam, delectus voluptatum harum ex facere quod non cupiditate repellendus, eius quaerat reiciendis? Nulla?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur optio quasi vel iusto consequatur quae porro aliquam, delectus voluptatum harum ex facere quod non cupiditate repellendus, eius quaerat reiciendis? Nulla?
              </div>
              <p className="flex justify-between w-full px-1 mt-1 text-sm font-extralight">
                <p><span className="font-semibold">Status: </span>Delivered</p>
                {moment().format("MMMM Do YYYY")}
              </p>
            </div>
          </div>

          <div className="flex space-x-1 px-2">
            <div className="h-10 w-10 rounded-full flex justify-center items-center text-xl font-bold bg-orange-700 text-white">
              {abbreviationGenerator("Cole", "Baidoo")}
            </div>
            <div className="border flex-1 h-auto p-2 relative rounded-lg bg-orange-500/20" >
              <p className=" font-extralight"> <span className="font-semibold">Cole Baidoo</span> {moment().format("HH:MM:SS")}</p>
              <div className="mt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur optio quasi vel iusto consequatur quae porro aliquam, delectus voluptatum harum ex facere quod non cupiditate repellendus, eius quaerat reiciendis? Nulla?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur optio quasi vel iusto consequatur quae porro aliquam, delectus voluptatum harum ex facere quod non cupiditate repellendus, eius quaerat reiciendis? Nulla?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur optio quasi vel iusto consequatur quae porro aliquam, delectus voluptatum harum ex facere quod non cupiditate repellendus, eius quaerat reiciendis? Nulla?
              </div>
              <p className="flex justify-between w-full px-1 mt-1 text-sm font-extralight">
                <p><span className="font-semibold">Status: </span>Delivered</p>
                {moment().format("MMMM Do YYYY")}
              </p>
            </div>
          </div>

          <div className="flex flex-row-reverse space-x-1 px-2">
            <div className="h-10 ml-1 w-10 rounded-full flex justify-center items-center text-xl font-bold bg-blue-700 text-white">
              {abbreviationGenerator("John", "Doe")}
            </div>
            <div className="border flex-1 h-auto p-2 relative rounded-lg bg-blue-500/20" >
              <p className=" font-extralight"> <span className="font-semibold">John Doe</span> {moment().format("HH:MM:SS")}</p>
              <div className="mt-4 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur optio quasi vel iusto consequatur quae porro aliquam, delectus voluptatum harum ex facere quod non cupiditate repellendus, eius quaerat reiciendis? Nulla?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur optio quasi vel iusto consequatur quae porro aliquam, delectus voluptatum harum ex facere quod non cupiditate repellendus, eius quaerat reiciendis? Nulla?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur optio quasi vel iusto consequatur quae porro aliquam, delectus voluptatum harum ex facere quod non cupiditate repellendus, eius quaerat reiciendis? Nulla?
              </div>
              <p className="flex justify-between w-full px-1 mt-1 text-sm font-extralight">
                <p><span className="font-semibold">Status: </span>Delivered</p>
                {moment().format("MMMM Do YYYY")}
              </p>
            </div>
          </div> */}
        </div>
        <div className="w-full h-60 scrollbar-hide overflow-y-scroll">
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(e) => setContent(e)}
          />
        </div>
        <div className="flex justify-end items-center gap-3">
          <button className=" border flex text-xl items-center justify-center gap-2 px-3 py-2 font-extralight rounded-lg bg-orange-700 hover:bg-orange-800 shadow-md text-white">
            Archive{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
              />
            </svg>
          </button>
          <button
            onClick={handleMessageSending}
            className=" border flex text-xl items-center justify-center gap-2 px-3 py-2 font-extralight rounded-lg bg-green-700 hover:bg-green-800 shadow-md text-white"
          >
            {offerMessageMutation?.isLoading ? "Sending..." : "Send"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionThread;
