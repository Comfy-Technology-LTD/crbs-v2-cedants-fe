import { Triangle } from "react-loader-spinner"
import { LoadingProps } from "../../interfaces"

const Loading: React.FC<LoadingProps> = ({ title }) => {
  return (
    <div className="z-50 bg-[#3C667B] w-full max-w-lg flex flex-col justify-center items-center p-6 rounded-full shadow-lg">
    <Triangle
      visible={true}
      height={80}
      width={80}
      color="#ffa31a"
      ariaLabel="triangle-loading" 
      />
    <h1 className="mt-6 text-lg text-white">{title}</h1>
  </div>
  )
}

export default Loading;