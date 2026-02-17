import React from "react";
import { Outlet } from "react-router-dom";
const Layout = ({ children }) => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center py-10 px-4 md:px-0 relative"
      style={{
           backgroundImage: "url('/bg.jpg')",
      }}
    >

      <div className="relative z-10 w-full max-w-6xl flex flex-col gap-6">
        
       
        <header className="bg-[#7F95A7] backdrop-blur-md text-white rounded-xl py-4 px-8 flex justify-between items-center shadow-lg ">
        
  <span className="text-xl font-semibold tracking-tight">
    Elevate
  </span>

  <h1 className="text-xl font-medium hidden md:block absolute left-1/2 -translate-x-1/2">
    Frontend Advanced Bootcamp Task
  </h1>


  
        </header>

        <main className="w-full">
          {children}
        </main>

      </div>
    </div>
  );
};

export default Layout;
