import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white flex items-center justify-center px-4 py-3 shadow-md">
      <div className="flex items-center">
        <img
          src="/logo.svg" 
          alt="Logo"
          className="h-10 w-10 rounded-full mr-3"
        />
        <h1 className="text-xl font-semibold">Welcome to Email Builder</h1>
      </div>
    </nav>
  );
};

export default Navbar;
