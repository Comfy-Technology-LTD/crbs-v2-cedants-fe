import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import apiInstance from "../../util";
import Loading from "./Loading";
import { useEffect } from "react";
import { toast } from "react-toastify";

const PlacingSlipModal: React.FC<{ close: () => void }> = ({ close }) => {
  const [searchParams] = useSearchParams()

  const { data, isLoading, isError, isRefetching} = useQuery({
    queryKey: ['placingSlip'],
    queryFn: async () => {
      const params = searchParams.get('_content')
      const response = await apiInstance.get(`api/v1/generate-placing-slip/${params}`, {
        headers: {
          'Content-Type': 'application/pdf',
          'Authorization': 'Bearer 8|xJs2fUqSbH3KOtTuOvorzY0gh3JMw6m544EB10pHaf9889fc'
        },
        responseType: 'blob'
      })

      return URL.createObjectURL(response?.data)
    }
  })


  if (isLoading || isRefetching) {
    return (
      <Loading title="Preparing your placing slip" />
    )
  }

  if (isError) {
     return  toast.warn("Error", {
      theme: "colored"
     })
  }



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl overflow-hidden h-3/4 py-4 md:w-full space-y-4">
        <div className="border-b flex justify-between py-2">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 ">
              Preview placing slip
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

        <div className="border h-[50vh]">
          <iframe src={data} width="100%" height="750" className="border-none">
          </iframe>
        </div>


      </div>
    </div>
  )
}

export default PlacingSlipModal;