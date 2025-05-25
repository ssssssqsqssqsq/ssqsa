import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/servers');
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F0518] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0518] flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=1280')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0518]/90 via-[#1A0F2E]/90 to-[#2D1B4E]/90"></div>
        
        <motion.div 
          className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-purple-600/20 filter blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-blue-600/20 filter blur-3xl"
          animate={{ 
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <motion.div 
        className="bg-[#1A0F2E]/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to Reload</h1>
          <p className="text-gray-300">Sign in with Discord to access exclusive servers</p>
        </div>
        
        <button
          onClick={() => loginWithRedirect()}
          className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center"
        >
          <LogIn size={20} className="mr-2" />
          Continue with Discord
        </button>
        
        <p className="text-gray-400 text-sm mt-6 text-center">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
