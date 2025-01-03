import moment from "moment";
import parse from 'html-react-parser'
import { abbreviationFullNameGenerator } from "../../util";
import { ReviewProps } from "../../interfaces";


type ReviewThreadProps = {
  reviews: ReviewProps[]
}

const ReviewThread: React.FC<ReviewThreadProps> = ({ reviews }) => {
  return (
    <div className='border-2 border-dashed space-y-4 rounded-lg h-auto  overflow-y-scroll scrollbar-hide p-2'>
      {
        reviews.length ? reviews.map(
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

        ) : (
          <div className="flex flex-col items-center justify-center p-6 rounded-lg space-y-4 text-gray-700">
            <div className="text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16.2a4.992 4.992 0 01-3.975-2.468M15 20H9m6 0h.01M19.938 5.006A8 8 0 116.062 18.994 8 8 0 0119.938 5.006z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold">No Comments Yet</h1>
            <p className="text-sm text-gray-500 text-center">
              It seems no one has shared their thoughts here yet. The offer looks good so far!
            </p>
          </div>

        )
      }
    </div>
  )
}


export default ReviewThread;