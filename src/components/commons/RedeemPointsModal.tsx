import { useState } from 'react';
import CountUp from 'react-countup';
import { FaCoins } from 'react-icons/fa';
import apiInstance from '../../util';
import { UnderWriterPointProps } from '../../interfaces';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loading from './Loading';
import { toast } from 'react-toastify';
import { SPINQRCODE } from '../../constants';
import { date } from 'zod';
import Voucher from './Voucher';

interface RedeemPointsModalProps {
  close: () => void
}

const RedeemPointsModal: React.FC<RedeemPointsModalProps> = ({ close }) => {
  const [points, setPoints] = useState(0);
  // const [toggleEye, setToggleEye] = useState(false);

  const {
    data: underPointData,
    isLoading: isUnderWriterPointLoading,
  } = useQuery<UnderWriterPointProps>({
    queryKey: ["fetchRedeemablePoint"],
    queryFn: async () => {
      const response = await apiInstance.get(`api/v1/point`);
      console.log(response)
      return response?.data.data;
    },
  });

  const redeemPointsMutation = useMutation({
      mutationKey: ['redeemPointsMutate'],
      mutationFn: async (data: {points: number}) => {
        return apiInstance.post('api/v1/point', data)
      },
      onSuccess: (data) => {
         toast.success(data?.data.message, {
          theme: "colored"
         });
      },
      onError: (error) => {
        console.log(error)
        // toast.error(error)
      }
  }); 


  const handlePointsRedeeming = () => {
    if (!points) {
      toast.warn("Points not redeemable", {
        theme: "colored"
      })
      return;
    }

    if (underPointData && points > underPointData?.total_points_earned) {
      toast.warn("Claim below or equal to your total points earned", {
        theme: "colored"
      });
    }

    const data = {
      points
    }
    redeemPointsMutation.mutateAsync(data)
  }


  if (isUnderWriterPointLoading) {
    return <Loading title='Checking your points...' />
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 py-2">💎 Redeem Your Points 💎! </h2>

          {/* Replace */}
          <Voucher points_earned={underPointData?.total_points_earned || 0} badge_earned={underPointData?.badge_earned || "ROOKIE"} />

          <div>
            {
              (underPointData && underPointData?.total_points_earned >= 20) ? (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-600 mb-1 py-1 text-lg font-extralight">Points to Redeem</label>
                    <input
                      type="number"
                      value={points}
                      onChange={(e) => setPoints(parseInt(e.target.value))}
                      placeholder="Enter number of points to redeem"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      step={5}
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={close}
                      className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePointsRedeeming}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                      {
                        redeemPointsMutation?.isLoading ? "Redeeming..." : "Redeem"
                      }
                    </button>
                  </div>
                </>
              ) : (
                <div>
                  <h1 className='py-2 font-thin text-sm'>🎯 Earn more points to unlock exciting rewards 🎁 and be eligible to redeem 🏆!</h1>
                  <button
                    onClick={close}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                  >
                    Come Back Later
                  </button>
                </div>
              )
            }
          </div>


        </div>
      </div>
    </>
  );
};

export default RedeemPointsModal;
