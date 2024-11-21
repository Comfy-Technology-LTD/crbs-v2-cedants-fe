import { useQuery } from "@tanstack/react-query";
import { ClaimPointProps, VoucherModalProps } from "../../interfaces";
import apiInstance from "../../util";
import Voucher from "./Voucher";
import Loading from "./Loading";
import { useSearchParams } from "react-router-dom";

const VoucherModal: React.FC<VoucherModalProps> = ({ close }) => {

  const [searchParams] = useSearchParams()

  const {
    data: underPointData,
    isLoading,
    // refetch: refetchUnderWriterPoint,
  } = useQuery<{ data: ClaimPointProps}>({
    queryKey: ["fetchPoint"],
    queryFn: async () => {
      const param = searchParams.get('_content');
      const response = await apiInstance.get(`api/v1/under-writer-point/${param}`);
      console.log(response)
      return response?.data;
    },
  });

  if (isLoading) {
    return <Loading  title="Generating your voucher..." />
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-whites p-6 rounded-lg sshadow-lg max-w-xl overflow-hidden h-auto md:w-full space-y-4">
      <div className="flex justify-end h-full px-2">
        <svg
          onClick={close}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-9 cursor-pointer text-red-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
        <Voucher points_earned={underPointData?.data?.claimed_points || 0} badge_earned={underPointData?.data?.badge_earned || "ROOKIE"} voucher_code={underPointData?.data?.claim_voucher} />
      </div>
    </div>
  )
}

export default VoucherModal;