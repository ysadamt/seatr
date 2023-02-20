import React from "react";

interface BackdropProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Backdrop = ({ children, onClick }: BackdropProps) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[#000000e1] flex items-center justify-center transition-opacity opacity-0 focus:opacity-100" onClick={onClick}>
      {children}
    </div>
  );
}

export default Backdrop;