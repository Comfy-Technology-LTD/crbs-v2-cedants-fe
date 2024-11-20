import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import apiInstance from "../../util";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { PDFICON } from "../../constants";

const PlacingSlipModal: React.FC<{ close: () => void }> = ({ close }) => {

  const [tab, setTab] = useState<number>(1);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl overflow-hidden h-3/4 py-4 md:w-full space-y-4">
        <div className="border-b flex justify-between py-2">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 ">
              Preview {
                tab == 1 ? "placing slip" : "supporting documents"
              }
            </h2>
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

        <div>
          <div className="flex sspace-x-5">
            <div onClick={() => setTab(1)} className={`flex-1 ${tab == 1 ? "border-b-2 border-b-[#3C667B]" : ""} hover:bg-gray-300 hover:text-[#76a5bc] transition-all duration-500 text-center py-2 font-semibold text-[#3C667B] cursor-pointer`}>Placing slips</div>
            <div onClick={() => setTab(2)} className={`flex-1 ${tab == 2 ? "border-b-2 border-b-[#3C667B]" : ""} hover:bg-gray-300 hover:text-[#76a5bc] transition-all duration-500 text-center py-2 font-semibold text-[#3C667B] cursor-pointer`}>Supporting documents</div>
          </div>
        </div>

        {
          tab == 1 ? (
            <PlacingView />
          ) : ""
        }

        {
          tab == 2 ? (
            <SupportingDocumentView />
          ) : ""
        }

      </div>
    </div>
  )
}

const PlacingView: React.FC = () => {
  const [searchParams] = useSearchParams()

  const { data, isLoading, isError, isRefetching } = useQuery({
    queryKey: ['placingSlip'],
    queryFn: async () => {
      const params = searchParams.get('_content')
      const response = await apiInstance.get(`api/v1/generate-placing-slip/${params}`, {
        headers: {
          'Content-Type': 'application/pdf'
        },
        responseType: 'blob'
      })
      console.log(response?.data);
      return URL.createObjectURL(response?.data)
    },
    refetchOnWindowFocus: false
  })


  if (isLoading || isRefetching) {
    return (
      <Loading title="Preparing your placing slip" />
    )
  }

  if (isError) {
    return toast.warn("Error", {
      theme: "colored"
    })
  }

  return (
    <div className="border h-[50vh]">
      <iframe src={data} width="100%" height="750" className="border-none">
      </iframe>
    </div>
  )
}

const SupportingDocumentView: React.FC = () => {
  const [searchParams] = useSearchParams()

  const { data, isLoading, isError, isRefetching, refetch } = useQuery({
    queryKey: ['supportingSlip'],
    enabled: false,
    queryFn: async () => {
      const params = searchParams.get('_content')
      const response = await apiInstance.get(`api/v1/generate-supporting-docs/${params}`, {
        headers: {
          'Content-Type': 'application/pdf'
        },
        responseType: 'blob'
      })

      console.log(response?.data);
      return URL.createObjectURL(response?.data)
    },
    refetchOnWindowFocus: false
  },
)

  const { data: singleOffer, isLoading: isSingleLoading, isFetching } = useQuery<{ data: { data: number } }>({
    queryKey: ['singleOffer'],
    queryFn: () => {
      const param = searchParams.get('_content');
      return apiInstance.get(`api/v1/offer-docs-content/${param}`)
    },
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (singleOffer?.data?.data && singleOffer?.data?.data > 0) {
      console.log("here ", singleOffer)
      refetch()
    }

  }, [refetch, singleOffer])

  if (isSingleLoading || isFetching) {
    return <Loading title="Confirming documents availiability..." />
  }

  if (isRefetching) {
    return (
      <Loading title="Preparing your supporting documents" />
    )
  }

  if (isError) {
    return toast.warn("Error", {
      theme: "colored"
    })
  }

  return (
    <>
      {
        singleOffer?.data?.data === 0 ? (
          <div className="flex justify-center  items-center flex-col h-[50vh]">
            <img className=" w-44" src={PDFICON} alt="No doc found" />
            <h1 className=" text-xl font-semibold mt-2">No Attachments available</h1>
            <p className=" text-lg font-extralight">Try adding some supporting documents</p>
          </div>
        ) :
          (<div className="border h-[50vh]">
            <iframe src={data} width="100%" height="750" className="border-none">
            </iframe>
          </div>)
      }
    </>
  )
}

export default PlacingSlipModal;