import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiInstance from "../../util";
import Loading from "../../components/commons/Loading";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../interfaces";

type ValidateOTPProps = {
  phone: string;
  otp: string;
}

const ManagerAuth: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [lastFourDigits, setLastFourDigits] = useState<string>("");
  const [authView, setAuthView] = useState<boolean>(true)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const validateOTPMutation = useMutation({
    mutationKey: ['validateOTPMutation'],
    mutationFn: (data: ValidateOTPProps) => {
      return apiInstance.post(`/v1/api/validate-otp`, data)
    },
    onSuccess: (data) => {
      console.log(data)
      toast.success(data.data.message, {
        theme: 'colored',
        position: 'top-center'
      });


      setAuthView(false)
      localStorage.setItem("__u_access_token", data.data.access_token)
      localStorage.setItem("__u", JSON.stringify(data.data.user))
      navigate("/manager-dashboard/offers-dashboard", { replace: true })

    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error(error)
      toast.warn(error?.response?.data?.message, {
        theme: 'colored',
        position: 'top-center'
      });
      setAuthView(true)
      console.log("Something went wrong")
    }
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 1) return;

    const otpArray = otp.split("");
    otpArray[index] = value;
    setOtp(otpArray.join(""));

    const nextInput = document.getElementById(`otp-input-${index + 1}`);
    if (value && nextInput) {
      (nextInput as HTMLInputElement).focus();
    }
  };

  const handleSubmit = () => {

    console.log(`OTP Submitted: ${otp}`);
    const phonenumber: string = atob(searchParams.get('q') || "")
    const data: ValidateOTPProps = {
      phone: phonenumber,
      otp
    }

    const otp_values = document.querySelectorAll('.otp-values');
    otp_values.forEach((el) => {
      const els = (el as HTMLInputElement)
      console.log(els)
      els.value = ""
    })

    console.log(data);
    validateOTPMutation.mutate(data)

  };

  useEffect(() => {
    const phonenumber: string = atob(searchParams.get('q') || "")

    if (!phonenumber) {
      navigate("/", {
        replace: true
      })
      toast.warn("Invalid contact.\nPlease reach out to your comfy.", {
        theme: "colored"
      })
    }

    setLastFourDigits(phonenumber?.slice(7))
  }, [searchParams, navigate])


  useEffect(() => {
    const phonenumber: string = atob(searchParams.get('q') || "")

    if (!phonenumber) {
      navigate("/", {
        replace: true
      })
      toast.warn("Invalid contact.\nPlease reach out to your comfy.", {
        theme: "colored"
      })
    }
  }, [searchParams, navigate])


  const authMutation = useMutation({
    mutationKey: ['authMutation'],
    mutationFn: () => {
      const phonenumber: string = atob(searchParams.get('q') || "");
      return apiInstance.post(`/v1/api/generate-otp`, {
        phonenumber
      })
    },
    onSuccess: (data) => {
      console.log(data)
      toast.success(data.data.message, {
        theme: 'colored',
        position: 'top-center'
      });
      setAuthView(false)
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error(error)
      toast.warn(error?.response?.data?.message, {
        theme: 'colored',
        position: 'top-center'
      });
      setAuthView(true)
      console.log("Something went wrong")
    }
  });


  const handleAuthentication = () => {
    console.log("Authenticated")
    authMutation.mutateAsync()
  }


  if (authMutation.isLoading) {
    return <Loading title="Generating OTP. One moment ..." />
  }

  // if (authMutation.isError) {
  //   navigate("/", {
  //     replace: true
  //   })
  //   toast.warn("Error Generating OTP.\nPlease reach out to your comfy.", {
  //     theme: "colored"
  //   })
  //   return
  // }



  return (
    <>
      {
        authView ? (
          <div className="flex justify-center items-center h-screen ">
            <div className="bg-white p-8 rounded-lg shadow-md w-[450px] place-items-center space-y-3 ">
              <h1 className="text-2xl font-bold text-gray-700 text-center mb-2">Welcome</h1>
              <p className="text-gray-600 text-center mb-4">
                You can access and <strong className="underline"> approve offers</strong> securely by authenticating with secure <strong className="underline">OTP</strong>
              </p>
              <button onClick={handleAuthentication} className="border px-3 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800">
                {
                  authMutation.isLoading ? "Generating OTP..." : "Login"
                }
              </button>
            </div>
          </div>

        ) : (
          <div className="flex justify-center items-center h-screen ">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
              <h1 className="text-2xl font-bold text-gray-700 text-center mb-2">OTP Verification</h1>
              <p className="text-gray-600 text-center mb-4">
                Enter the verification code sent to your number
              </p>
              <p className="text-center text-lg font-medium text-gray-800 mb-6">*****-{lastFourDigits}</p>
              <div className="flex justify-center gap-2 mb-6">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength={1}
                    value={otp[index] || ""}
                    onChange={(e) => handleChange(e, index)}
                    className="otp-values w-12 h-12 text-center text-xl font-bold rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  />
                ))}
              </div>
              <button
                onClick={handleSubmit}
                className="w-full py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
              >
                Verify
              </button>
              <p className="text-center text-gray-500 text-sm mt-4">
                Didn't receive the code?{" "}
                <button onClick={handleAuthentication} className={`text-indigo-500 hover:underline `} disabled={authMutation.isLoading}>Resend</button>
              </p>
            </div>
          </div>
        )
      }
    </>

  );
};

// type AuthViewProps = {
//   setAuthView: (view: boolean) => void
//   mutation: () => void
// }

// const AuthView: React.FC<AuthViewProps> = ({ setAuthView, mutation }) => {

// }

export default ManagerAuth;


