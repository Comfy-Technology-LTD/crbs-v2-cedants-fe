import { Line } from "rc-progress";
import { SingleOfferResponse } from "../../interfaces";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import apiInstance from "../../util";
import Loading from "./Loading";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { PDFICON } from "../../constants";

interface UploadDocumentsModalProps {
  close: () => void;
}

const UploadDocumentsModal: React.FC<UploadDocumentsModalProps> = ({
  close,
}) => {
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);
  const [searchParams] = useSearchParams();
  const [progressPercentage, setProgressPercentage] = useState<number>(0);

  const {
    data: singleOffer,
    isLoading: isSingleLoading,
    isFetching,
  } = useQuery<SingleOfferResponse>({
    queryKey: ["singleOffer"],
    queryFn: () => {
      const param = searchParams.get("_content");
      return apiInstance.get(`api/v1/offer/${param}`);
    },
    refetchOnWindowFocus: false,
  });

  const fileUploadMutation = useMutation({
    mutationKey: ["fileUploadMutation"],
    mutationFn: async () => {
      const param = searchParams.get("_content");

      if (!uploadFiles || uploadFiles.length === 0) {
        toast.error("No files selected.", {
          theme: "colored",
        });
        return;
      }

      const formData = new FormData();
      Array.from(uploadFiles).forEach((file, key) => {
        formData.append(`files${key}`, file);
      });

      return apiInstance.post(`/api/v1/offer-files/${param}`, formData, {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgressPercentage(percentage);
        },
      });
    },
    onSuccess: (data) => {
      console.log(data)
      toast.success(data?.data?.message, {
        theme: "colored",
      });
      setProgressPercentage(0)
      setUploadFiles(null)
    },
    onError: (error) => {
      console.log(error);
      toast.error("error", {
        theme: "colored",
      });
      setProgressPercentage(0)
      setUploadFiles(null)
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files);
      setUploadFiles(e.target.files);
    }
  };

  const handleFileUpload = () => {
    if (!uploadFiles || uploadFiles.length == 0) {
      toast.warn("No documents found for uploading...", {
        theme: "colored",
      });
      return;
    }

    fileUploadMutation.mutateAsync();
  };

  // useEffect(() => {
  //   fileUploadMutation.mutate()
  // }, [uploadFiles, fileUploadMutation])

  const fileSizeInMB = (filesize: number) =>
    (filesize / (1024 * 1024)).toFixed(2);

  if (isSingleLoading || isFetching) {
    return <Loading title="Preparing for attachments..." />;
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 px-4 py-4">
      <div className="flex space-x-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl overflow-hidden h-full md:w-[600px] space-y-4">
          <div className=" max-w-3xl mx-auto p-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className=" text-lg font-semibold mb-1">
                  Upload Documents
                </h1>
                <h3 className="text-xs  py-1 ">
                  Attach supporting facultative documents
                </h3>
              </div>
              <div>
                <button
                  onClick={handleFileUpload}
                  className="border px-2 py-1  rounded-lg bg-green-600 hover:bg-green-700 text-white shadow-md text-xs"
                >
                  Upload Docs
                </button>
              </div>
            </div>

            <div className="border-2 border-dashed p-2 mt-1 mb-1 rounded-lg">
              <h2 className="font-semibold text-sm mb-2">Facultative offer overview</h2>
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
                      singleOffer?.data.data.offer_detail
                        .period_of_insurance_from
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

            <div className="bg-gray-50 text-center px-4 rounded w-full h-40 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-400 border-dashed font-[sans-serif]">
              <div className="py-6">
                <input
                  type="file"
                  accept=".pdf"
                  id="uploadFile1"
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                />
                <label
                  htmlFor="uploadFile1"
                  className="block px-6 py-2.5 rounded text-gray-600 text-sm tracking-wider cursor-pointer font-semibold border-none outline-none bg-gray-200 hover:bg-gray-100"
                >
                  Browse Files
                </label>
                <p className="text-xs text-gray-400 mt-4">
                  Only PDFs are Allowed.
                </p>
              </div>
            </div>

            {

              fileUploadMutation.isLoading ? (<div>
                <h4 className="text-base text-gray-600 font-semibold mb-2">
                  Uploading {uploadFiles?.length} Documents
                </h4>
                <Line
                  strokeColor="blue"
                  strokeWidth={2}
                  percent={progressPercentage}
                />
                <p className="text-sm text-gray-500 font-semibold flex-1 mt-2 flex items-center">
                  {progressPercentage}% done{" "}
                  {/* <span className="ml-2 cursor-pointer">
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
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </span> */}
                </p>
              </div>) : ""
            }
            {
              uploadFiles?.length ? (
                <div className="mt-4">
                  <div className="space-y-2 mt-4 h-[200px] scrollbar-hide overflow-y-scroll">
                    {Object.entries(uploadFiles).map(([key, file]) => (
                      <div key={key} className="flex flex-col">
                        <div className="flex border p-2 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-500 cursor-pointer">
                          <p className="text-sm flex text-gray-500 font-semibold flex-1">
                            <img className="w-10 mr-2" src={PDFICON} alt={file.name} />
                            <div className="flex flex-col">
                              <span className=" font-semibold">File name: {file.name}{" "}</span>
                              <span className=" font-thin">
                                File size {fileSizeInMB(file.size)} mb
                              </span>
                            </div>
                          </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 cursor-pointer shrink-0 fill-black hover:fill-red-500"
                            viewBox="0 0 320.591 320.591"
                          >
                            <path
                              d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                              data-original="#000000"
                            ></path>
                            <path
                              d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                              data-original="#000000"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className=" flex justify-end mt-2">
                    <span className="text-xs font-thin">Count: {uploadFiles?.length}</span>
                  </div>
                </div>
              ) : (
                ""
              )
            }
          </div>
        </div>
        {/* Preview Document */}
        <div
          className={` hidden bg-white p-6 rounded-lg shadow-lg max-w-3xl overflow-hidden h-full md:w-[1300px] space-y-4`}
        ></div>
        <div className="flex justify-end">
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
      </div>
    </div>
  );
};

export default UploadDocumentsModal;
