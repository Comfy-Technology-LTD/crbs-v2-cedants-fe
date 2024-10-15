import { LOGO } from "../constants";

const Login: React.FC = () => {
  return (
    <div className="relative bg-white w-full max-w-lg mx-auto border flex flex-col gap-4 p-6 rounded-lg">
      <img src={LOGO} alt="Visal Re" className="h-10 shadow-md w-10 absolute -top-5 border rounded-full p-2 mx-auto left-1/2 transform -translate-x-1/2  bg-white sm:h-10" />
      <h1 className="font-semibold text-center text-2xl text-gray-600">Log in</h1>
      <input 
        type="email" 
        placeholder="Email" 
        className="border w-full h-12 rounded-md pl-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input 
        type="password" 
        placeholder="Password" 
        className="border w-full h-12 rounded-md pl-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input 
        type="button" 
        value="Login" 
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
