import { useEffect, useState } from "react";
import { LOGO } from "../constants";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginProps } from "../interfaces";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors } } = useForm<LoginProps>()
  const { login, user, isAuthenticated } = useAuth()

  const handleLoginToPlaceIt: SubmitHandler<LoginProps> = async (data) => {
    setIsLoading(true)
    try {
      await login(data.email, data.password)
      setIsLoading(false)
      navigate("/dashboard", { replace: true })
    } 
    catch (error: any ) 
    {
      setIsLoading(false)

      if (error?.status === 422) {
        toast.warn(error?.response.data.message, {
          theme: "colored"
        })
      }
       else {
        console.log(error)
        toast.warn("Login failed", {
          theme: "colored"
        })
       }
     
    }
  }

  useEffect(() => {
    console.log(isAuthenticated)
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true })
    } else {
      console.log("Not authenticated ", JSON.stringify(user))
    }
  }, [isAuthenticated, navigate, user])




  return (
    <div className="relative bg-white w-full max-w-lg mx-auto border flex flex-col gap-4 p-6 rounded-lg">
      <img src={LOGO} alt="Visal Re" className="h-10 shadow-md w-10 absolute -top-5 border rounded-full p-2 mx-auto left-1/2 transform -translate-x-1/2  bg-white sm:h-10" />
      <h1 className="font-semibold text-center text-2xl text-gray-600">Log in</h1>
      <input
        type="email"
        placeholder="Email"
        {
        ...register("email", {
          required: "Email is required"
        })
        }
        className="border w-full h-12 rounded-md pl-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors?.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Password"
        {
        ...register("password", {
          required: "Password is required"
        })
        }
        className="border w-full h-12 rounded-md pl-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors?.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

      <input
        onClick={handleSubmit(handleLoginToPlaceIt)}
        type="button"
        value={`${isLoading ? 'Loading...' : 'Login'}`}
        className="bg-blue-700 text-white w-full h-12 rounded-md font-semibold hover:bg-blue-800 cursor-pointer transition duration-200"
      />
      <a className="text-center text-blue-700" href="">Forgot password?</a>
      <h3 className="text-center font-semibold">
        Not a member yet?{" "}
        <a className="text-blue-700 hover:underline" href="/register">
          Create an Account
        </a>
      </h3>
    </div>
  );
}

export default Login;
