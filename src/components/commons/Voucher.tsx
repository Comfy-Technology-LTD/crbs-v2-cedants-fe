import { FaCoins } from "react-icons/fa"
import { SPINQRCODE } from "../../constants"
import CountUp from "react-countup"
import { VoucherProps } from "../../interfaces"

const Voucher: React.FC<VoucherProps> = ({ points_earned, badge_earned, voucher_code }) => {
  return (
    <div className="relative h-48 py-2 rounded-xl bg-slate-600 mb-4 shadow-lg ">
            <div className="flex  px-4 justify-between space-x-5 mt-2">
              <div className="flex items-center space-x-2">
                <FaCoins className="text-yellow-400" size={30} />
                <div>
                  <h3 className="font-semibold text-sm text-white">
                  {!voucher_code ?  "Points Earned" : "Points Claimed"}
                  </h3>
                  <h4 className="text-sm font-light text-white">
                    <CountUp end={points_earned || 0} />
                  </h4>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#ffd700"
                  className="w-8"
                  viewBox="0 0 512 512"
                >
                  <path d="M211 7.3C205 1 196-1.4 187.6 .8s-14.9 8.9-17.1 17.3L154.7 80.6l-62-17.5c-8.4-2.4-17.4 0-23.5 6.1s-8.5 15.1-6.1 23.5l17.5 62L18.1 170.6c-8.4 2.1-15 8.7-17.3 17.1S1 205 7.3 211l46.2 45L7.3 301C1 307-1.4 316 .8 324.4s8.9 14.9 17.3 17.1l62.5 15.8-17.5 62c-2.4 8.4 0 17.4 6.1 23.5s15.1 8.5 23.5 6.1l62-17.5 15.8 62.5c2.1 8.4 8.7 15 17.1 17.3s17.3-.2 23.4-6.4l45-46.2 45 46.2c6.1 6.2 15 8.7 23.4 6.4s14.9-8.9 17.1-17.3l15.8-62.5 62 17.5c8.4 2.4 17.4 0 23.5-6.1s8.5-15.1 6.1-23.5l-17.5-62 62.5-15.8c8.4-2.1 15-8.7 17.3-17.1s-.2-17.4-6.4-23.4l-46.2-45 46.2-45c6.2-6.1 8.7-15 6.4-23.4s-8.9-14.9-17.3-17.1l-62.5-15.8 17.5-62c2.4-8.4 0-17.4-6.1-23.5s-15.1-8.5-23.5-6.1l-62 17.5L341.4 18.1c-2.1-8.4-8.7-15-17.1-17.3S307 1 301 7.3L256 53.5 211 7.3z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-sm text-white">
                    Badge Earned
                  </h3>
                  <h4 className="text-sm font-light text-white">
                    {badge_earned}
                  </h4>
                </div>
              </div>
            </div>
            <div className='px-4 flex items-center  absolute bottom-4  w-full'>
              <div>
                <img className='w-20' src={SPINQRCODE} alt="link to spin game" />
              </div>
              <div className=' flex-1'>
                <h1 className=' text-right  text-white text-2xl font-semibold uppercase'>Voucher: <span className="font-thin">{voucher_code ? voucher_code : <span>XXXX-XXXX</span> }</span></h1>
                <h3 className=' text-right mt-1 text-white text-sm font-extralight italic'>Exp: 01/25</h3>
                <p className='text-xs text-right  text-white mt-2'>Note: Gain more points to win more exciting gifts</p>
              </div>
            </div>
          </div>
  )
}

export default Voucher;