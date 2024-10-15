import CountUp from "react-countup";
import { BusinessStatsProps } from "../../interfaces";

const BusinessStats: React.FC<BusinessStatsProps> = ({ icon, title, value }) => {
  return (
    <div className="flex cursor-pointer items-center p-3 border rounded-xl shadow-lg bg-white space-x-5 transition-all hover:shadow-2xl hover:scale-105 transform duration-300 ease-in-out">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl shadow-md">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-lg text-gray-700">{title}</h3>
        <h3 className="text-2xl font-light text-gray-900">
          <CountUp end={value} />
        </h3>
      </div>
    </div>
  );
};

export default BusinessStats;