import React from 'react';
import SearchInput from './SearchInput';

interface TopbarProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

const Topbar: React.FC<TopbarProps> = ({ title, subtitle }) => {
  return (
    <div className="w-full flex items-center justify-between bg-white h-[50px] p-2 border border-[#F3F3F3]">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        {title && <h5 className="font-bold text-black">{title}</h5>}
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center w-[400px]">
        <SearchInput placeholder="Name, Phone no." />
      </div>

    </div>
  );
};

export default Topbar;
