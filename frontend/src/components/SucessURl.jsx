import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';

const SucessURl = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen flex-col bg-gradient-to-r from-green-100 to-blue-100 p-4">
      {/* Confetti Effect */}
      <Confetti
        className="absolute"
        drawShape={(ctx) => {
          ctx.beginPath();
          for (let i = 0; i < 22; i++) {
            const angle = 0.35 * i;
            const x = (0.2 + 1.5 * angle) * Math.cos(angle);
            const y = (0.2 + 1.5 * angle) * Math.sin(angle);
            ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.closePath();
        }}
      />

      {/* Thank You Message */}
      <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-lg w-full">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Thank You for Your Purchase!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Your order has been successfully processed. We hope you enjoy your purchase!
        </p>
        
        {/* Back to Website Button */}
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default SucessURl;
