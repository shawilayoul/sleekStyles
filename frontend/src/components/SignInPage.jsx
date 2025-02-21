import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { signIn ,error } = useAuthStore();

  const [role, setRole] = useState(''); 
  const [rolleError, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      await signIn(formData?.email, formData?.password);
      if (role === 'customer') {
        // handle customer login logic
        navigate('/customerProfile');
      } else if (role === 'admin') {
        navigate('/dashboard');
      } else {
        setError('Please select a role');
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
   
  };

  return (
    <div className="flex justify-center p-10 items-center bg-gray-100 h-[100%]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        
        {/* Role Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Role</label>
          <div className="flex justify-around">
            <button
              onClick={() => setRole('customer')}
              className={`py-2 px-4 border rounded-md ${role === 'customer' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
            >
              Customer
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`py-2 px-4 border rounded-md ${role === 'admin' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
            >
              Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <div onClick={() => navigate("/forgotPassword")}>
              <p className="w-full text-blue-600 cursor-pointer">Forgot password?</p>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-800 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </div>
        </form>

        <div>
          {(error || rolleError) && <p className="text-center text-red-500">{error || error}</p>}
        </div>

        <div onClick={() => navigate("/signup")}>
          <p className="w-full py-2 text-blue-600 cursor-pointer">
            Do not have an account? Create one
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
