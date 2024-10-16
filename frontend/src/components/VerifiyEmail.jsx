import { useState } from "react";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

const VerifiyEmail = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const { verifyEmail, error} = useAuthStore();
 const navigate = useNavigate()
  const handleChange = (e) => {
    const { value } = e.target;
    // Only allow numeric input and limit the length to 6 digits
    if (value.length <= 6 && /^[0-9]*$/.test(value)) {
      setVerificationCode(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (verificationCode.length === 6) {
      await verifyEmail(verificationCode);
      navigate('/signin')
    } else {
      alert("Please enter a 6-digit code.");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Verify Your Email
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Please enter the 6-digit code sent to your email.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="text"
              value={verificationCode}
              onChange={handleChange}
              placeholder="Enter 6-digit code"
              className="w-full p-4 border border-gray-300 rounded-md text-center text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength="6"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Verify Email
          </button>
        </form>
        { error && <p className="text-center text-red-500">{ error}</p>}
      </div>
    </div>
  );
};

export default VerifiyEmail;
