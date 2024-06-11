import React, { useState } from 'react';
import AuthModal from '../modals/AuthModal';

const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-11/12 md:w-1/3">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-600">Welcome to Task Management App</h1>
        <p className="text-lg mb-6 text-center text-gray-700">Manage your tasks efficiently and effectively.</p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={openAuthModal}
            className="text-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
          >
            Login / Register
          </button>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </div>
  );
};

export default Home;
