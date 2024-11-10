import { LOGO } from "../constants";
import { useForm, SubmitHandler } from "react-hook-form";
import { CedantProps, RegisterProps } from "../interfaces";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiInstance, { errorHandler } from "../util";
import { Bounce, toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import Loading from "../components/commons/Loading";

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<RegisterProps>()

  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ['cedants'],
    queryFn: async () => {
      const response = await apiInstance.get('api/cedants')
      const data = await response.data
      return data
    }
  })

  const cedantMutation = useMutation({
    mutationKey: ["cedantOnboarding"],
    mutationFn: async (data: RegisterProps) => {
      return apiInstance.post('api/cedants', data)
    },
    onSuccess: (data) => {
      console.log(data)
      toast.success(data.data.message, {
        theme: 'colored',
        position: 'top-center'
      });
      reset({
        insurersinsurer_id: "",
        assoc_first_name: "",
        assoc_last_name: "",
        assoc_primary_phonenumber: "",
        assoc_email: "",
        password: "",
        password_confirmation: "",
      })
      navigate("/", { replace: true })
      toast("Please login with your credentails", {
        theme: 'colored',
        position: 'top-center',
        transition: Bounce,
        progress: undefined,
        hideProgressBar: true
      });
    },
    onError: (error: AxiosError) => {
      console.log(error)
      if (error?.status == 422) {
        const errorBag = error?.response?.data?.errors;
        errorHandler(errorBag);
      }
    }
  })

  const registerCedantsToPlaceIt: SubmitHandler<RegisterProps> = (data) => {
    console.log(data)
    cedantMutation.mutate(data)

  }

  if (isLoading) {
    return (
     <Loading title="Preparing Onboarding..." />
    )
  }

  return (
    <div className="relative bg-white w-full max-w-lg mx-auto border flex flex-col gap-4 p-6 rounded-lg shadow-lg">
      <img
        src={LOGO}
        alt="Visal Re"
        className="h-12 w-12 absolute -top-6 border shadow-md rounded-full p-2 mx-auto left-1/2 transform -translate-x-1/2 bg-white"
      />
      <h1 className="font-semibold text-center text-2xl text-gray-600 mt-6">Create Account</h1>
      <select
        {
        ...register('insurersinsurer_id', {
          required: "Select insurance company"
        })
        }
        defaultValue={""}

        className="border w-full h-12 rounded-md pl-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="" disabled selected>Select Insurance Company</option>
        {
          data?.map(({ id, insurer_company_name }: CedantProps, index: number) => (
            <option key={index} value={id}>{insurer_company_name}</option>
          ))
        }
      </select>
      {errors?.insurersinsurer_id && <p className="text-red-500 text-sm">{errors.insurersinsurer_id.message}</p>}

      <input
        type="text"
        placeholder="First Name"
        {
        ...register('assoc_first_name', {
          required: "First name is required"
        })
        }
        defaultValue={""}
        className="border w-full h-12 rounded-md pl-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors?.assoc_first_name && <p className="text-red-500 text-sm">{errors.assoc_first_name.message}</p>}

      <input
        type="text"
        {
        ...register('assoc_last_name', {
          required: "Last name is required"
        })
        }
        defaultValue={""}
        placeholder="Last Name"
        className="border w-full h-12 rounded-md pl-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors?.assoc_last_name && <p className="text-red-500 text-sm">{errors.assoc_last_name.message}</p>}

      <input
        type="email"
        placeholder="Email"
        {
        ...register('assoc_email', {
          required: "Organisation email is required"
        })
        }
        defaultValue={""}
        className="border w-full h-12 rounded-md pl-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors?.assoc_email && <p className="text-red-500 text-sm">{errors.assoc_email.message}</p>}

      <input
        type="tel"
        {
        ...register('assoc_primary_phonenumber', {
          required: "Primary phone number is required"
        })
        }
        defaultValue={""}
        placeholder="Primary Phone Number"
        className="border w-full h-12 rounded-md pl-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors?.assoc_primary_phonenumber && <p className="text-red-500 text-sm">{errors.assoc_primary_phonenumber.message}</p>}

      <input
        type="password"
        {
        ...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must have atleast 8 character"
          }
        })}
        defaultValue={""}
        placeholder="Password"
        className="border w-full h-12 rounded-md pl-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors?.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

      <input
        type="password"
        placeholder="Confirm Password"
        {
        ...register("password_confirmation", {
          validate: value =>
            value === watch("password") || "The passwords do not match"
        })}
        defaultValue={""}
        className="border w-full h-12 rounded-md pl-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors?.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation.message}</p>}


      <input
        type="button"
        value={`${cedantMutation.isLoading ? 'Loading...' : 'Sign Up'}`}
        onClick={handleSubmit(registerCedantsToPlaceIt)}
        className="bg-blue-700 text-white w-full h-12 rounded-md font-semibold hover:bg-blue-800 cursor-pointer transition duration-200"
      />

      <p className="text-center font-semibold mt-4">
        Already have an account?{" "}
        <a className="text-blue-700 hover:underline" href="/">
          Log In
        </a>
      </p>
    </div>
  );
};

export default Register;
