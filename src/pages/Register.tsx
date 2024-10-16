import { LOGO } from "../constants";

const Register: React.FC = () => {
  return (
    <div className="relative bg-white w-full max-w-lg mx-auto border flex flex-col gap-4 p-6 rounded-lg shadow-lg">
      <img 
        src={LOGO} 
        alt="Visal Re" 
        className="h-12 w-12 absolute -top-6 border shadow-md rounded-full p-2 mx-auto left-1/2 transform -translate-x-1/2 bg-white"
      />
      <h1 className="font-semibold text-center text-2xl text-gray-600 mt-6">Create Account</h1>
      
      <select className="border w-full h-12 rounded-md pl-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="" disabled selected>Select Insurance Company</option>
        <option value="company1">Insurance Company 1</option>
        <option value="company2">Insurance Company 2</option>
        <option value="company3">Insurance Company 3</option>
        {/* Add more options as needed */}
      </select>

      <input 
        type="text" 
        placeholder="First Name" 
        className="border w-full h-12 rounded-md pl-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input 
        type="text" 
        placeholder="Last Name" 
        className="border w-full h-12 rounded-md pl-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input 
        type="email" 
        placeholder="Email" 
        className="border w-full h-12 rounded-md pl-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input 
        type="tel" 
        placeholder="Phone Number" 
        className="border w-full h-12 rounded-md pl-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input 
        type="password" 
        placeholder="Password" 
        className="border w-full h-12 rounded-md pl-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input 
        type="password" 
        placeholder="Confirm Password" 
        className="border w-full h-12 rounded-md pl-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <input 
        type="button" 
        value="Sign Up" 
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
